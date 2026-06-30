const TOPICS = {
  all: ['"fiber optic" drone','"tethered drone"','"tethered UAV"','"fiber optic sensing" drone','OFDR cable','"optical fiber" UAV','"drone tether"','"fiber optic" "unmanned aerial"'],
  tether: ['"tethered drone"','"tethered UAV"','"drone tether"'],
  fiber: ['"fiber optic" drone','"optical fiber" UAV','"fiber optic sensing" drone'],
  sensing: ['OFDR cable','"distributed fiber sensing" drone','"fiber optic sensing" cable'],
  defense: ['"tethered drone" defense','"tethered UAV" military','"drone tether" surveillance']
};
const SOURCES = ['ieee.org','optica.org','spie.org','uasvision.com','unmannedsystemstechnology.com','droneblog.com','dronebelow.com','defenseone.com','breakingdefense.com','janes.com','armyrecognition.com','thedefensepost.com','interestingengineering.com','techxplore.com','phys.org','sciencedaily.com','arxiv.org'];
const FALLBACK_ARTICLES = [
  { title:'Google News: fiber optic tethered drone', url:'https://news.google.com/search?q=fiber%20optic%20tethered%20drone%20when%3A5y', source:'Google News', date:'', language:'en', image:'' },
  { title:'Google News: tethered UAV fiber optic', url:'https://news.google.com/search?q=tethered%20UAV%20fiber%20optic%20when%3A5y', source:'Google News', date:'', language:'en', image:'' },
  { title:'Google News: optical fiber UAV', url:'https://news.google.com/search?q=optical%20fiber%20UAV%20when%3A5y', source:'Google News', date:'', language:'en', image:'' },
  { title:'Google News: OFDR cable drone', url:'https://news.google.com/search?q=OFDR%20cable%20drone%20when%3A5y', source:'Google News', date:'', language:'en', image:'' },
  { title:'Google Scholar: fiber optic tethered drone', url:'https://scholar.google.com/scholar?q=fiber+optic+tethered+drone', source:'Google Scholar', date:'', language:'en', image:'' },
  { title:'Google Scholar: distributed fiber sensing drone cable', url:'https://scholar.google.com/scholar?q=distributed+fiber+sensing+drone+cable', source:'Google Scholar', date:'', language:'en', image:'' },
  { title:'IEEE search: fiber optic drone tether', url:'https://ieeexplore.ieee.org/search/searchresult.jsp?queryText=fiber%20optic%20drone%20tether', source:'IEEE Xplore', date:'', language:'en', image:'' },
  { title:'arXiv search: UAV fiber optic sensing', url:'https://arxiv.org/search/?query=UAV+fiber+optic+sensing&searchtype=all', source:'arXiv', date:'', language:'en', image:'' }
];
function yyyymmdd(d){ return d.getUTCFullYear().toString()+String(d.getUTCMonth()+1).padStart(2,'0')+String(d.getUTCDate()).padStart(2,'0')+'000000'; }
function cleanArticle(a){ return { title:a.title||'Untitled', url:a.url, source:a.domain||a.sourceCountry||'source', date:a.seendate||'', language:a.language||'', image:a.socialimage||'' }; }
function uniq(items){ const seen=new Set(); return items.filter(x=>{ if(!x.url||seen.has(x.url)) return false; seen.add(x.url); return true; }); }
exports.handler = async (event) => {
  const topic = event.queryStringParameters?.topic || 'all';
  const q = event.queryStringParameters?.q || '';
  const years = Math.min(Math.max(parseInt(event.queryStringParameters?.years || '5',10),1),5);
  const max = Math.min(Math.max(parseInt(event.queryStringParameters?.max || '80',10),10),200);
  const end = new Date();
  const start = new Date(Date.UTC(end.getUTCFullYear()-years,end.getUTCMonth(),end.getUTCDate()));
  const terms = q ? [q] : (TOPICS[topic] || TOPICS.all);
  const query = '(' + terms.join(' OR ') + ')';
  const params = new URLSearchParams({ query, mode:'artlist', format:'json', maxrecords:String(max), sort:'datedesc', startdatetime:yyyymmdd(start), enddatetime:yyyymmdd(end) });
  const api = 'https://api.gdeltproject.org/api/v2/doc/doc?' + params.toString();
  try {
    const res = await fetch(api, { headers:{ 'user-agent':'CableVitality-NewsBot/1.0' } });
    const text = await res.text();
    let data; try { data = JSON.parse(text); } catch { data = { articles: [] }; }
    const articles = uniq((data.articles || []).map(cleanArticle));
    const finalArticles = articles.length ? articles : FALLBACK_ARTICLES;
    return { statusCode:200, headers:{ 'content-type':'application/json; charset=utf-8', 'cache-control':'public, max-age=900' }, body:JSON.stringify({ ok:true, fallback:!articles.length, topic, query, years, count:finalArticles.length, generatedAt:new Date().toISOString(), sources:SOURCES, articles:finalArticles }) };
  } catch(err) {
    return { statusCode:200, headers:{ 'content-type':'application/json; charset=utf-8', 'cache-control':'no-store' }, body:JSON.stringify({ ok:false, fallback:true, error:err.message, topic, query, years, generatedAt:new Date().toISOString(), sources:SOURCES, articles:FALLBACK_ARTICLES }) };
  }
};

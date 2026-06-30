(function(){
  if(document.querySelector('.cv-command')) return;
  var here = location.pathname.split('/').pop() || 'index.html';
  var isLocal = location.protocol === 'file:';
  var rootPrefix = location.pathname.indexOf('/apps/') !== -1 || location.pathname.indexOf('/deepseek/') !== -1 ? '../' : '';
  var links = [
    ['בית', rootPrefix + 'index.html'],
    ['משחק ראשי', rootPrefix + 'apps/cablevitality_game_original.html'],
    ['דף חוקר', rootPrefix + 'researcher.html'],
    ['רובוט אבות', rootPrefix + 'robot-avot.html'],
    ['כותרות', rootPrefix + 'world-feed.html'],
    ['כתבות', rootPrefix + 'news.html'],
    ['מי בנה מה', rootPrefix + 'about.html'],
    ['QA', rootPrefix + 'qa-report.html']
  ];
  var bar = document.createElement('div');
  bar.className = 'cv-command';
  bar.innerHTML =
    '<div class="cv-command-inner">' +
      '<a class="cv-command-brand" href="'+rootPrefix+'index.html">' +
        '<span class="cv-command-logo">CV</span>' +
        '<span class="cv-command-title">רחפן סיב אופטי<span>מרכז דמואים, חדשות ו-QA</span></span>' +
      '</a>' +
      '<nav class="cv-command-links" aria-label="ניווט ראשי">' +
        links.map(function(l){
          var active = here === l[1].split('/').pop();
          return '<a '+(active?'class="cv-status-pill" ':'')+'href="'+l[1]+'">'+l[0]+'</a>';
        }).join('') +
        '<a class="'+(isLocal?'cv-local-pill':'cv-status-pill')+'" href="'+(isLocal?'https://zippy-beijinho-ecc2bc.netlify.app/':'#')+'">'+(isLocal?'פתח אתר חי':'אתר חי')+'</a>' +
      '</nav>' +
    '</div>';
  document.body.insertBefore(bar, document.body.firstChild);
  if(isLocal){
    var note = document.createElement('div');
    note.className = 'cv-page-note';
    note.innerHTML = '<strong>מצב מקומי:</strong> חלק מהפידים החיים עובדים רק באתר Netlify. הדפים מציגים גיבוי מקומי כדי שלא תראה מסך שבור.';
    bar.insertAdjacentElement('afterend', note);
  }
  var dock = document.createElement('div');
  dock.className = 'cv-qa-dock';
  dock.innerHTML = '<span class="cv-qa-dot"></span><span>QA: קישורים, מובייל ופיד חדשות נבדקים</span>';
  document.body.appendChild(dock);
})();

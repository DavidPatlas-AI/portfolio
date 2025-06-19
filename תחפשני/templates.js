// מאגר תבניות פישינג
const templates = {
    bank: {
        title: 'בנק הפועלים',
        html: `<div style="max-width: 600px; font-family: Arial; direction: rtl; margin: 0 auto; border: 1px solid #ddd;">
<div style="background: #1f4788; color: white; padding: 20px; text-align: center;">
    <h1 style="margin: 0; font-size: 24px;">🏦 בנק הפועלים</h1>
</div>
<div style="padding: 20px; background: white;">
    <h2 style="color: #dc3545; margin-top: 0;">⚠️ התראת אבטחה חשובה</h2>
    <p style="font-size: 16px; line-height: 1.5;">שלום רב,</p>
    <p style="font-size: 16px; line-height: 1.5;">זיהינו פעילות חשודה בחשבון הבנק שלך:</p>
    <div style="background: #fff3cd; padding: 15px; margin: 20px 0; border-radius: 5px; border: 1px solid #ffc107;">
        <strong>🚨 החשבון הוקפא זמנית למען ביטחונך!</strong><br>
        <span style="font-size: 14px;">מספר החשבון: ****1234</span>
    </div>
    <p style="font-size: 16px; line-height: 1.5;">לביטול הקפאת החשבון, יש לאמת את זהותך:</p>
    <div style="text-align: center; margin: 30px 0;">
        <a href="#" style="background: #1f4788; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">אמת זהות עכשיו</a>
    </div>
    <p style="font-size: 14px; color: #666; margin-top: 30px;">
        בכבוד רב,<br>
        צוות אבטחת המידע<br>
        בנק הפועלים
    </p>
</div>
</div>`,
        tips: '• בדוק שהשולח הוא מכתובת רשמית של הבנק (@bankhapoalim.co.il)\n• בנקים לא יבקשו מידע רגיש במייל\n• התקשר לבנק לאימות\n• בדוק את כתובת הקישור לפני לחיצה'
    },

    post: {
        title: 'דואר ישראל',
        html: `<div style="max-width: 600px; font-family: Arial; direction: rtl; margin: 0 auto; border: 1px solid #ddd;">
<div style="background: #0066cc; color: white; padding: 20px; text-align: center;">
    <h1 style="margin: 0; font-size: 24px;">📮 דואר ישראל</h1>
</div>
<div style="padding: 20px; background: white;">
    <h2 style="color: #0066cc; margin-top: 0;">📦 חבילה ממתינה לאיסוף</h2>
    <p style="font-size: 16px; line-height: 1.5;">שלום,</p>
    <p style="font-size: 16px; line-height: 1.5;">חבילה בינלאומית עבורך הגיעה למרכז הגיון והיא ממתינה לאיסוף.</p>
    <div style="background: #e3f2fd; padding: 15px; margin: 20px 0; border-radius: 5px;">
        <p style="margin: 5px 0;"><strong>מספר משלוח:</strong> IL987654321PS</p>
        <p style="margin: 5px 0;"><strong>משקל:</strong> 1.2 ק"ג</p>
        <p style="margin: 5px 0;"><strong>דמי מכס:</strong> ₪47.80</p>
        <p style="margin: 5px 0;"><strong>תאריך הגעה:</strong> 10/06/2025</p>
    </div>
    <div style="background: #fff3cd; padding: 15px; margin: 20px 0; border-radius: 5px; border: 1px solid #ffc107;">
        <strong>⏰ תשלום דמי המכס נדרש תוך 48 שעות</strong><br>
        <span style="font-size: 14px;">אחרת החבילה תוחזר לשולח</span>
    </div>
    <div style="text-align: center; margin: 30px 0;">
        <a href="#" style="background: #0066cc; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">שלם דמי מכס</a>
    </div>
    <p style="font-size: 14px; color: #666;">
        בברכה,<br>
        דואר ישראל
    </p>
</div>
</div>`,
        tips: '• בדוק שהכתובת היא israelpost.co.il\n• דואר ישראל לא מבקש תשלום מקוון עבור דמי מכס\n• אמת את מספר המשלוח באתר הרשמי\n• תשלום דמי מכס נעשה במשרד הדואר'
    },

    paypal: {
        title: 'PayPal',
        html: `<div style="max-width: 600px; font-family: Arial; direction: ltr; margin: 0 auto; border: 1px solid #ddd;">
<div style="background: #003087; color: white; padding: 20px; text-align: center;">
    <h1 style="margin: 0; font-size: 24px; font-weight: normal;">PayPal</h1>
</div>
<div style="padding: 20px; background: white;">
    <h2 style="color: #003087; margin-top: 0;">Payment Verification Required</h2>
    <p style="font-size: 16px; line-height: 1.5;">Hello,</p>
    <p style="font-size: 16px; line-height: 1.5;">We've detected unusual activity on your PayPal account and need you to verify a recent transaction:</p>
    <div style="background: #fff8e1; padding: 15px; margin: 20px 0; border-radius: 5px; border: 1px solid #ffcc02;">
        <p style="margin: 5px 0;"><strong>Transaction ID:</strong> 8XY12345Z</p>
        <p style="margin: 5px 0;"><strong>Amount:</strong> $249.99 USD</p>
        <p style="margin: 5px 0;"><strong>Merchant:</strong> Tech Solutions Pro</p>
        <p style="margin: 5px 0;"><strong>Status:</strong> Pending Review</p>
    </div>
    <div style="background: #ffebee; padding: 15px; margin: 20px 0; border-radius: 5px; border: 1px solid #f44336;">
        <strong>⚠️ Account Limited</strong><br>
        <span style="font-size: 14px;">Your account has been temporarily limited until verification is complete</span>
    </div>
    <p style="font-size: 16px; line-height: 1.5;">To restore full access to your account, please verify this transaction:</p>
    <div style="text-align: center; margin: 30px 0;">
        <a href="#" style="background: #0070ba; color: white; padding: 15px 30px; text-decoration: none; border-radius: 20px; font-weight: bold; display: inline-block;">Verify Transaction</a>
    </div>
    <p style="font-size: 14px; color: #666;">
        Thanks,<br>
        PayPal Security Team
    </p>
</div>
</div>`,
        tips: '• Check sender is from @paypal.com (not @paypaI.com)\n• PayPal never asks for passwords or sensitive info via email\n• Login directly to PayPal to check account status\n• Verify transaction details in your PayPal account'
    },

    google: {
        title: 'Google',
        html: `<div style="max-width: 600px; font-family: Arial; direction: ltr; margin: 0 auto; border: 1px solid #ddd;">
<div style="background: white; padding: 20px; text-align: center; border-bottom: 1px solid #e0e0e0;">
    <h1 style="margin: 0; color: #4285f4; font-size: 28px; font-weight: 300;">Google</h1>
    <h2 style="margin: 10px 0 0 0; color: #333; font-size: 20px; font-weight: 400;">Security Alert</h2>
</div>
<div style="padding: 20px; background: white;">
    <p style="font-size: 16px; line-height: 1.5; color: #333;">Hi there,</p>
    <p style="font-size: 16px; line-height: 1.5; color: #333;">We detected unusual sign-in activity on your Google Account:</p>
    <div style="background: #fef7e0; padding: 15px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #fbbc04;">
        <p style="margin: 5px 0; color: #333;"><strong>Device:</strong> Windows PC - Chrome</p>
        <p style="margin: 5px 0; color: #333;"><strong>Location:</strong> Unknown Location</p>
        <p style="margin: 5px 0; color: #333;"><strong>Time:</strong> June 12, 2025 at 2:34 PM</p>
        <p style="margin: 5px 0; color: #333;"><strong>IP Address:</strong> 185.220.101.42</p>
    </div>
    <div style="background: #fce8e6; padding: 15px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #ea4335;">
        <strong style="color: #d93025;">⚠️ Action Required</strong><br>
        <span style="font-size: 14px; color: #5f6368;">If this wasn't you, your account may be compromised</span>
    </div>
    <p style="font-size: 16px; line-height: 1.5; color: #333;">To secure your account, please review this activity:</p>
    <div style="text-align: center; margin: 30px 0;">
        <a href="#" style="background: #1a73e8; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: 500; display: inline-block;">Secure My Account</a>
    </div>
    <p style="font-size: 14px; color: #5f6368; margin-top: 30px;">
        Best regards,<br>
        Google Security Team
    </p>
</div>
</div>`,
        tips: '• Check sender is @google.com or @gmail.com\n• Google never asks for passwords in emails\n• Check account activity directly at myaccount.google.com\n• Be suspicious of urgent security alerts'
    },

    microsoft: {
        title: 'Microsoft',
        html: `<div style="max-width: 600px; font-family: Arial; direction: ltr; margin: 0 auto; border: 1px solid #ddd;">
<div style="background: #0078d4; color: white; padding: 20px; text-align: center;">
    <h1 style="margin: 0; font-size: 24px; font-weight: 400;">Microsoft Office 365</h1>
</div>
<div style="padding: 20px; background: white;">
    <h2 style="color: #323130; margin-top: 0; font-weight: 400;">Account Verification Required</h2>
    <p style="font-size: 16px; line-height: 1.5; color: #323130;">Hello,</p>
    <p style="font-size: 16px; line-height: 1.5; color: #323130;">Your Office 365 subscription requires immediate verification to continue service:</p>
    <div style="background: #fff4ce; padding: 15px; margin: 20px 0; border-radius: 4px; border: 1px solid #ffb900;">
        <p style="margin: 5px 0; color: #323130;"><strong>Subscription:</strong> Office 365 Personal</p>
        <p style="margin: 5px 0; color: #323130;"><strong>Account:</strong> user@email.com</p>
        <p style="margin: 5px 0; color: #323130;"><strong>Status:</strong> Verification Pending</p>
        <p style="margin: 5px 0; color: #323130;"><strong>Expires:</strong> June 13, 2025</p>
    </div>
    <div style="background: #fdf2f2; padding: 15px; margin: 20px 0; border-radius: 4px; border: 1px solid #d13438;">
        <strong style="color: #d13438;">⏰ Expires in 24 hours</strong><br>
        <span style="font-size: 14px; color: #605e5c;">After expiration, you will lose access to all Office applications</span>
    </div>
    <p style="font-size: 16px; line-height: 1.5; color: #323130;">Click below to verify your account and maintain access:</p>
    <div style="text-align: center; margin: 30px 0;">
        <a href="#" style="background: #0078d4; color: white; padding: 12px 24px; text-decoration: none; border-radius: 2px; font-weight: 600; display: inline-block;">Verify Account Now</a>
    </div>
    <p style="font-size: 14px; color: #605e5c;">
        Thank you,<br>
        Microsoft Office Team
    </p>
</div>
</div>`,
        tips: '• Check sender is @microsoft.com or @office.com\n• Microsoft gives more notice before subscription expiry\n• Verify subscription status at account.microsoft.com\n• Be wary of urgent 24-hour deadlines'
    },

    netflix: {
        title: 'Netflix',
        html: `<div style="max-width: 600px; font-family: Arial; direction: ltr; margin: 0 auto; border: 1px solid #ddd;">
<div style="background: #e50914; color: white; padding: 20px; text-align: center;">
    <h1 style="margin: 0; font-size: 28px; font-weight: 700; letter-spacing: 0.5px;">NETFLIX</h1>
</div>
<div style="padding: 20px; background: white;">
    <h2 style="color: #221f1f; margin-top: 0; font-weight: 500;">Payment Update Required</h2>
    <p style="font-size: 16px; line-height: 1.5; color: #221f1f;">Hi,</p>
    <p style="font-size: 16px; line-height: 1.5; color: #221f1f;">We're having trouble processing your payment for your Netflix membership.</p>
    <div style="background: #fff2f2; padding: 15px; margin: 20px 0; border-radius: 4px; border-left: 4px solid #e50914;">
        <p style="margin: 5px 0; color: #221f1f;"><strong>Plan:</strong> Premium (4K + HDR)</p>
        <p style="margin: 5px 0; color: #221f1f;"><strong>Monthly Fee:</strong> $15.49</p>
        <p style="margin: 5px 0; color: #221f1f;"><strong>Payment Method:</strong> •••• •••• •••• 1234</p>
        <p style="margin: 5px 0; color: #221f1f;"><strong>Last Attempt:</strong> June 12, 2025</p>
    </div>
    <div style="background: #fff3cd; padding: 15px; margin: 20px 0; border-radius: 4px; border: 1px solid #ffc107;">
        <strong style="color: #856404;">⚠️ Account will be suspended in 48 hours</strong><br>
        <span style="font-size: 14px; color: #856404;">Update your payment method to continue streaming</span>
    </div>
    <p style="font-size: 16px; line-height: 1.5; color: #221f1f;">To keep watching your favorite shows and movies, please update your payment information:</p>
    <div style="text-align: center; margin: 30px 0;">
        <a href="#" style="background: #e50914; color: white; padding: 16px 32px; text-decoration: none; border-radius: 4px; font-weight: 500; font-size: 16px; display: inline-block;">Update Payment Method</a>
    </div>
    <p style="font-size: 14px; color: #737373;">
        Questions? Visit our Help Center<br>
        The Netflix Team
    </p>
</div>
</div>`,
        tips: '• Check sender is @netflix.com (not @netfIix.com)\n• Netflix typically gives more time before suspension\n• Login directly to Netflix to check payment status\n• Netflix emails usually have your account details'
    },

    whatsapp: {
        title: 'WhatsApp',
        html: `<div style="max-width: 600px; font-family: Arial; direction: rtl; margin: 0 auto; border: 1px solid #ddd;">
<div style="background: #25d366; color: white; padding: 20px; text-align: center;">
    <h1 style="margin: 0; font-size: 24px; font-weight: 400;">💬 WhatsApp</h1>
</div>
<div style="padding: 20px; background: white;">
    <h2 style="color: #075e54; margin-top: 0;">אישור מכשיר חדש</h2>
    <p style="font-size: 16px; line-height: 1.5;">שלום,</p>
    <p style="font-size: 16px; line-height: 1.5;">זוהה ניסיון כניסה לחשבון WhatsApp שלך ממכשיר לא מוכר:</p>
    <div style="background: #e8f5e8; padding: 15px; margin: 20px 0; border-radius: 5px; border: 1px solid #25d366;">
        <p style="margin: 5px 0;"><strong>מכשיר:</strong> iPhone 15 Pro</p>
        <p style="margin: 5px 0;"><strong>מיקום:</strong> תל אביב, ישראל</p>
        <p style="margin: 5px 0;"><strong>זמן:</strong> 12/06/2025 בשעה 14:30</p>
        <p style="margin: 5px 0;"><strong>כתובת IP:</strong> 87.69.185.42</p>
    </div>
    <div style="background: #fff3cd; padding: 15px; margin: 20px 0; border-radius: 5px; border: 1px solid #ffc107;">
        <strong>🔐 נדרש אישור בטחון</strong><br>
        <span style="font-size: 14px;">אם זה לא אתה, החשבון שלך עלול להיות בסכנה</span>
    </div>
    <p style="font-size: 16px; line-height: 1.5;">לחץ על הכפתור למטה כדי לאשר או לחסום את המכשיר:</p>
    <div style="text-align: center; margin: 30px 0;">
        <a href="#" style="background: #25d366; color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block; margin: 5px;">✅ אשר מכשיר</a>
        <a href="#" style="background: #dc3545; color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block; margin: 5px;">❌ חסום</a>
    </div>
    <p style="font-size: 14px; color: #666;">
        בברכה,<br>
        צוות האבטחה של WhatsApp
    </p>
</div>
</div>`,
        tips: '• WhatsApp לא שולח מיילי אישור כאלה\n• אימות נעשה רק דרך האפליקציה במכשיר\n• בדוק בהגדרות האפליקציה את המכשירים המחוברים\n• WhatsApp לא מבקש פרטי התחברות במייל'
    },

    amazon: {
        title: 'Amazon',
        html: `<div style="max-width: 600px; font-family: Arial; direction: ltr; margin: 0 auto; border: 1px solid #ddd;">
<div style="background: #232f3e; color: white; padding: 20px;">
    <h1 style="margin: 0; font-size: 24px; font-weight: 400;">amazon</h1>
</div>
<div style="padding: 20px; background: white;">
    <h2 style="color: #0066c0; margin-top: 0; font-weight: 400;">Order Update Required</h2>
    <p style="font-size: 16px; line-height: 1.5; color: #0f1111;">Hello,</p>
    <p style="font-size: 16px; line-height: 1.5; color: #0f1111;">There's an issue with your recent Amazon order that requires immediate attention:</p>
    <div style="background: #f7f8f8; padding: 15px; margin: 20px 0; border-radius: 4px; border: 1px solid #ddd;">
        <p style="margin: 5px 0; color: #0f1111;"><strong>Order #:</strong> 114-7829304-2847628</p>
        <p style="margin: 5px 0; color: #0f1111;"><strong>Item:</strong> Apple AirPods Pro (2nd Gen)</p>
        <p style="margin: 5px 0; color: #0f1111;"><strong>Price:</strong> $249.00</p>
        <p style="margin: 5px 0; color: #0f1111;"><strong>Status:</strong> Payment Verification Needed</p>
    </div>
    <div style="background: #fff2cc; padding: 15px; margin: 20px 0; border-radius: 4px; border: 1px solid #ffb900;">
        <strong style="color: #7c6500;">⚠️ Shipment Delayed</strong><br>
        <span style="font-size: 14px; color: #7c6500;">Your order cannot be processed until payment is verified</span>
    </div>
    <p style="font-size: 16px; line-height: 1.5; color: #0f1111;">To continue with your order, please verify your payment information:</p>
    <div style="text-align: center; margin: 30px 0;">
        <a href="#" style="background: #ff9900; color: #0f1111; padding: 12px 24px; text-decoration: none; border-radius: 3px; font-weight: 700; display: inline-block;">Verify Payment</a>
    </div>
    <p style="font-size: 14px; color: #555;">
        Thank you for shopping with us,<br>
        Customer Service<br>
        Amazon.com
    </p>
</div>
</div>`,
        tips: '• Check sender is @amazon.com (not @amazone.com)\n• Login directly to Amazon to check order status\n• Amazon order numbers have specific format\n• Verify order details match your actual purchases'
    },

    apple: {
        title: 'Apple',
        html: `<div style="max-width: 600px; font-family: -apple-system, Arial; direction: ltr; margin: 0 auto; border: 1px solid #ddd;">
<div style="background: #f5f5f7; padding: 20px; text-align: center; border-bottom: 1px solid #d2d2d7;">
    <h1 style="margin: 0; color: #1d1d1f; font-size: 24px; font-weight: 600;">🍎 Apple</h1>
</div>
<div style="padding: 20px; background: white;">
    <h2 style="color: #1d1d1f; margin-top: 0; font-weight: 500;">App Store Purchase Receipt</h2>
    <p style="font-size: 16px; line-height: 1.5; color: #1d1d1f;">Dear Customer,</p>
    <p style="font-size: 16px; line-height: 1.5; color: #1d1d1f;">Thank you for your purchase from the App Store. Here are the details:</p>
    <div style="background: #f5f5f7; padding: 20px; margin: 20px 0; border-radius: 8px;">
        <p style="margin: 5px 0; color: #1d1d1f;"><strong>App:</strong> Premium Security Pro</p>
        <p style="margin: 5px 0; color: #1d1d1f;"><strong>Developer:</strong> SecureMax Solutions</p>
        <p style="margin: 5px 0; color: #1d1d1f;"><strong>Price:</strong> $99.99</p>
        <p style="margin: 5px 0; color: #1d1d1f;"><strong>Purchase Date:</strong> June 12, 2025</p>
    </div>
    <div style="background: #fff3cd; padding: 15px; margin: 20px 0; border-radius: 8px; border: 1px solid #ffc107;">
        <strong style="color: #856404;">💳 Payment Issue Detected</strong><br>
        <span style="font-size: 14px; color: #856404;">Your payment method was declined. Please update to avoid service interruption.</span>
    </div>
    <p style="font-size: 16px; line-height: 1.5; color: #1d1d1f;">If you did not authorize this purchase, please review your receipt:</p>
    <div style="text-align: center; margin: 30px 0;">
        <a href="#" style="background: #007aff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 500; display: inline-block;">Review Purchase</a>
    </div>
    <p style="font-size: 14px; color: #86868b;">
        Best regards,<br>
        Apple Store Team
    </p>
</div>
</div>`,
        tips: '• Check sender is @apple.com (not @appIe.com)\n• Apple receipts come from do_not_reply@apple.com\n• Check purchase history in App Store directly\n• Apple uses different receipt format'
    },

    facebook: {
        title: 'Facebook',
        html: `<div style="max-width: 600px; font-family: Arial; direction: ltr; margin: 0 auto; border: 1px solid #ddd;">
<div style="background: #1877f2; color: white; padding: 20px; text-align: center;">
    <h1 style="margin: 0; font-size: 24px; font-weight: 700;">facebook</h1>
</div>
<div style="padding: 20px; background: white;">
    <h2 style="color: #1c1e21; margin-top: 0; font-weight: 500;">Security Alert</h2>
    <p style="font-size: 16px; line-height: 1.5; color: #1c1e21;">Hi there,</p>
    <p style="font-size: 16px; line-height: 1.5; color: #1c1e21;">We detected a login attempt to your Facebook account from an unrecognized device:</p>
    <div style="background: #f0f2f5; padding: 15px; margin: 20px 0; border-radius: 8px; border: 1px solid #dadde1;">
        <p style="margin: 5px 0; color: #1c1e21;"><strong>Device:</strong> Samsung Galaxy S24</p>
        <p style="margin: 5px 0; color: #1c1e21;"><strong>Location:</strong> Unknown Location</p>
        <p style="margin: 5px 0; color: #1c1e21;"><strong>Browser:</strong> Chrome Mobile</p>
        <p style="margin: 5px 0; color: #1c1e21;"><strong>Time:</strong> June 12, 2025 at 3:15 PM</p>
    </div>
    <div style="background: #ffebee; padding: 15px; margin: 20px 0; border-radius: 8px; border: 1px solid #f44336;">
        <strong style="color: #c62828;">🚨 Suspicious Activity</strong><br>
        <span style="font-size: 14px; color: #c62828;">If this wasn't you, your account may be compromised</span>
    </div>
    <p style="font-size: 16px; line-height: 1.5; color: #1c1e21;">To secure your account, please review this login attempt:</p>
    <div style="text-align: center; margin: 30px 0;">
        <a href="#" style="background: #1877f2; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; display: inline-block; margin: 5px;">Secure Account</a>
        <a href="#" style="background: #42b883; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; display: inline-block; margin: 5px;">This Was Me</a>
    </div>
    <p style="font-size: 14px; color: #65676b;">
        Thanks,<br>
        Facebook Security Team
    </p>
</div>
</div>`,
        tips: '• Check sender is @facebookmail.com or @facebook.com\n• Login directly to Facebook to check security settings\n• Review recent login activity in settings\n• Facebook shows specific device and location info'
    }
}; 
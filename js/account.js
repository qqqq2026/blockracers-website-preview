/* BlockRacers account (website). Eén account voor website en game.
   Iedereen met een e-mailadres kan een account maken. Account 1 t/m 200 wordt automatisch goedgekeurd (actie claim in Edge Function invites), daarna wachtlijst.
   Sessie: cookies op .blockracers.online, gedeeld met game.blockracers.online.
   sharedStore() is gelijk aan die in BlockRacers/src/game/net.js: houd ze gelijk. */
(function () {
  'use strict';
  var root = document.getElementById('br-account');
  if (!root) return;
  var CFG = root.dataset, NL = CFG.lang !== 'en';
  var T = NL ? {
    off: 'Inloggen is nog niet beschikbaar. Probeer het later opnieuw.',
    tabLogin: 'Inloggen', tabNew: 'Account maken',
    email: 'E-mailadres', pw: 'Wachtwoord', pwNew: 'Kies een wachtwoord (minstens 8 tekens)', pw2: 'Nog een keer',
    show: 'Toon', hide: 'Verberg',
    login: 'Inloggen', forgot: 'Wachtwoord vergeten?',
    newIntro: 'Gratis, voor iedereen met een e-mailadres. Met je account log je in op de website en in de game.',
    age16: 'Ik ben 16 jaar of ouder', ageU16: 'Ik ben jonger dan 16',
    consent: 'Ik ga akkoord met de privacyregels.', consentU16: 'Mijn ouder of verzorger weet ervan en vindt het goed.', privacy: 'Privacy',
    create: 'Account maken',
    codeSent: function (e) { return 'We hebben een code van 6 cijfers gestuurd naar ' + e + '. Vul hem hier in. Kijk ook in je spam. Al een account? Dan krijg je geen code, log dan gewoon in.'; },
    newest: 'Gebruik altijd de nieuwste mail.', codePh: 'Code uit de mail', confirm: 'Bevestigen', resend: 'Nieuwe code sturen', back: 'Terug',
    resetSent: function (e) { return 'Als er een account is op ' + e + ', krijg je een code van 6 cijfers. Vul hem in, daarna kies je een nieuw wachtwoord.'; },
    sendCode: 'Stuur me een code',
    who: 'Ingelogd als', logout: 'Uitloggen',
    access: 'Beta-status',
    used: 'Goedgekeurd', play: 'Speel nu',
    noRights: 'Er kunnen geen rechten aan ontleend worden.',
    full: 'Beta vol, je staat op de wachtlijst.',
    busy: 'Je goedkeuring wordt verwerkt. Kom straks terug of log opnieuw in.',
    sent: 'Je invite-code is verstuurd. Vul de code uit de mail in (BR-XXXX-XXXX). Onder 16? Dan kreeg je ouder of verzorger de code.',
    useCode: 'Code gebruiken',
    pending: 'Je staat op de wachtlijst. We laten spelers in groepjes toe en mailen je code zodra je aan de beurt bent.',
    rejected: 'Je aanvraag is deze ronde niet gelukt. Je account blijft gewoon bestaan.',
    none: 'Spelen kan met een invite-code. Er zijn 200 plekken. Vraag je code hier aan.',
    spots: function (n) { return n > 0 ? 'Nog ' + n + ' van de 200 plekken vrij.' : 'Alle 200 plekken zijn bezet. Vraag toch aan, dan sta je op de wachtlijst.'; },
    parentQ: 'E-mailadres van je ouder of verzorger. Die krijgt de invite-code en beslist.',
    ask: 'Vraag mijn invite-code aan',
    settings: 'Instellingen', changePw: 'Wachtwoord wijzigen', save: 'Opslaan',
    danger: 'Account verwijderen', dangerTxt: 'Je account, profiel, voortgang en aanvraag worden direct gewist. Typ VERWIJDER om te bevestigen.',
    del: 'Ja, verwijder mijn account',
    e: {
      email: 'Vul een geldig e-mailadres in.', pwShort: 'Je wachtwoord moet minstens 8 tekens hebben.', pwSame: 'De twee wachtwoorden zijn niet hetzelfde.',
      age: 'Kies je leeftijd.', consent: 'Vink eerst de toestemming aan.', login: 'E-mail of wachtwoord klopt niet.',
      notConfirmed: 'Bevestig eerst je e-mailadres met de code uit de mail.', code: 'Die code klopt niet of is verlopen. Gebruik de nieuwste mail.',
      rate: 'Te veel pogingen. Wacht een paar minuten en probeer opnieuw.', parent: 'Vul het e-mailadres van je ouder of verzorger in (niet je eigen).',
      invite: 'Die code klopt niet bij dit account. Gebruik de code uit de nieuwste uitnodigingsmail.',
      full: 'Alle 200 plekken zijn bezet. Je staat op de wachtlijst, we mailen je zodra er plek is.',
      weak: 'Kies een sterker wachtwoord (minstens 8 tekens).', reauth: 'Log opnieuw in en probeer het nog eens.',
      noAccount: 'Er is nog geen account op dit e-mailadres. Maak er gratis een.', generic: 'Dat lukte nu niet. Controleer je internet en probeer het opnieuw.'
    },
    ok: { pw: 'Je nieuwe wachtwoord is opgeslagen.', ask: 'Gelukt! Je staat op de lijst.', redeemed: 'Je hebt game-toegang!', deleted: 'Je account is verwijderd.', resent: 'Nieuwe code verstuurd.' }
  } : {
    off: 'Login is not available yet. Please try again later.',
    tabLogin: 'Log in', tabNew: 'Create account',
    email: 'Email address', pw: 'Password', pwNew: 'Choose a password (at least 8 characters)', pw2: 'Once more',
    show: 'Show', hide: 'Hide',
    login: 'Log in', forgot: 'Forgot password?',
    newIntro: 'Free, for anyone with an email address. Your account works on the website and in the game.',
    age16: 'I am 16 or older', ageU16: 'I am under 16',
    consent: 'I agree to the privacy rules.', consentU16: 'My parent or guardian knows and agrees.', privacy: 'Privacy',
    create: 'Create account',
    codeSent: function (e) { return 'We sent a 6 digit code to ' + e + '. Enter it here. Check your spam too. Already have an account? Then no code comes, just log in.'; },
    newest: 'Always use the newest email.', codePh: 'Code from the email', confirm: 'Confirm', resend: 'Send a new code', back: 'Back',
    resetSent: function (e) { return 'If there is an account for ' + e + ', you get a 6 digit code. Enter it, then choose a new password.'; },
    sendCode: 'Send me a code',
    who: 'Logged in as', logout: 'Log out',
    access: 'Beta status',
    used: 'Approved', play: 'Play now',
    noRights: 'No rights can be derived from this.',
    full: 'Beta full, you\'re on the waitlist.',
    busy: 'Your approval is being processed. Come back later or log in again.',
    sent: 'Your invite code was sent. Enter the code from the email (BR-XXXX-XXXX). Under 16? Then your parent or guardian got the code.',
    useCode: 'Use code',
    pending: 'You are on the waiting list. We let players in a few at a time and email your code when it is your turn.',
    rejected: 'Your request did not make it this round. Your account stays.',
    none: 'Playing needs an invite code. There are 200 spots. Request your code here.',
    spots: function (n) { return n > 0 ? n + ' of 200 spots left.' : 'All 200 spots are taken. Request anyway to join the waiting list.'; },
    parentQ: 'Email address of your parent or guardian. They get the invite code and decide.',
    ask: 'Request my invite code',
    settings: 'Settings', changePw: 'Change password', save: 'Save',
    danger: 'Delete account', dangerTxt: 'Your account, profile, progress and request are deleted right away. Type VERWIJDER to confirm.',
    del: 'Yes, delete my account',
    e: {
      email: 'Enter a valid email address.', pwShort: 'Your password needs at least 8 characters.', pwSame: 'The two passwords do not match.',
      age: 'Choose your age.', consent: 'Please tick the consent box first.', login: 'Email or password is not right.',
      notConfirmed: 'Confirm your email first with the code from the email.', code: 'That code is wrong or expired. Use the newest email.',
      rate: 'Too many tries. Wait a few minutes and try again.', parent: 'Enter the email address of your parent or guardian (not your own).',
      invite: 'That code does not match this account. Use the code from the newest invite email.',
      full: 'All 200 spots are taken. You are on the waiting list, we email you when a spot opens.',
      weak: 'Choose a stronger password (at least 8 characters).', reauth: 'Log in again and retry.',
      noAccount: 'There is no account for this email yet. Create one for free.', generic: 'That did not work. Check your connection and try again.'
    },
    ok: { pw: 'Your new password is saved.', ask: 'Done! You are on the list.', redeemed: 'You have game access!', deleted: 'Your account was deleted.', resent: 'New code sent.' }
  };

  if (!CFG.url || !CFG.key || !window.supabase) { root.innerHTML = '<p class="acc-note">' + T.off + '</p>'; return; }

  function sharedStore() {
    if (!/(^|\.)blockracers\.online$/.test(location.hostname)) return null;
    var D = '; Domain=.blockracers.online; Path=/; Secure; SameSite=Lax', Y = '; Max-Age=34560000', N = 3000;
    function all() { var o = {}; document.cookie.split('; ').forEach(function (c) { var i = c.indexOf('='); if (i > 0) o[c.slice(0, i)] = c.slice(i + 1); }); return o; }
    function drop(k, from, to) { for (var j = from; j < to; j++) document.cookie = k + '.' + j + '=' + D + '; Max-Age=0'; }
    var S = {
      getItem: function (k) {
        var o = all(), n = +o[k + '.n'] || 0;
        if (!n) { var v = null; try { v = localStorage.getItem(k); if (v) { S.setItem(k, v); localStorage.removeItem(k); } } catch (e) {} return v; }
        var s = ''; for (var i = 0; i < n; i++) { if (o[k + '.' + i] == null) return null; s += o[k + '.' + i]; }
        try { return decodeURIComponent(s); } catch (e) { return null; }
      },
      setItem: function (k, v) {
        var e = encodeURIComponent(v), n = Math.ceil(e.length / N), old = +all()[k + '.n'] || 0;
        for (var i = 0; i < n; i++) document.cookie = k + '.' + i + '=' + e.slice(i * N, (i + 1) * N) + D + Y;
        drop(k, n, old); document.cookie = k + '.n=' + n + D + Y;
      },
      removeItem: function (k) { drop(k, 0, +all()[k + '.n'] || 0); document.cookie = k + '.n=' + D + '; Max-Age=0'; try { localStorage.removeItem(k); } catch (e) {} }
    };
    return S;
  }
  var st = sharedStore();
  if (!st) try { st = window.localStorage; } catch (e) {}
  var sb = window.supabase.createClient(CFG.url, CFG.key, { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true, storage: st || undefined, storageKey: 'br-auth' } });

  /* ---- uit de link: ?invite=BR-XXXX-XXXX#email=..., ?new=1, ?next=game ---- */
  var q = new URLSearchParams(location.search), hp = new URLSearchParams(location.hash.slice(1));
  var invite = (q.get('invite') || '').toUpperCase().replace(/[^A-Z0-9-]/g, '').slice(0, 14);
  if (!/^BR-[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(invite)) invite = '';
  try { if (invite) sessionStorage.setItem('br.invite', invite); else invite = sessionStorage.getItem('br.invite') || ''; } catch (e) {}
  var hintEmail = (hp.get('email') || '').trim().toLowerCase();
  var startTab = q.get('new') ? 'new' : 'login';
  if (q.has('invite') || hp.has('email') || q.has('new')) {
    q.delete('invite'); q.delete('new'); hp.delete('email');
    var qs = q.toString(), hs = hp.toString();
    history.replaceState(null, '', location.pathname + (qs ? '?' + qs : '') + (hs ? '#' + hs : ''));
  }
  var EM = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  /* ---- kleine helpers ---- */
  function h(tag, attrs, kids) {
    var el = document.createElement(tag);
    for (var k in attrs || {}) {
      if (k === 'text') el.textContent = attrs[k];
      else if (k.slice(0, 2) === 'on') el.addEventListener(k.slice(2), attrs[k]);
      else if (attrs[k] === true) el.setAttribute(k, '');
      else if (attrs[k] != null && attrs[k] !== false) el.setAttribute(k, attrs[k]);
    }
    (kids || []).forEach(function (c) { if (c) el.appendChild(typeof c === 'string' ? document.createTextNode(c) : c); });
    return el;
  }
  var msgEl = h('p', { class: 'acc-msg', role: 'status', 'aria-live': 'polite' });
  function say(t, good) { msgEl.textContent = t || ''; msgEl.className = 'acc-msg' + (good ? ' acc-msg--good' : t ? ' acc-msg--bad' : ''); }
  function field(label, input) { return h('label', { class: 'acc-field' }, [h('span', { text: label }), input]); }
  function pwInput(id, auto) {
    var i = h('input', { id: id, type: 'password', autocomplete: auto, maxlength: '72', class: 'acc-in' });
    var b = h('button', { type: 'button', class: 'acc-eye', text: T.show, onclick: function () { var s = i.type === 'password'; i.type = s ? 'text' : 'password'; b.textContent = s ? T.hide : T.show; } });
    return h('span', { class: 'acc-pw' }, [i, b]);
  }
  function busy(btn, on) { btn.disabled = on; btn.setAttribute('aria-busy', on ? 'true' : 'false'); }
  async function run(btn, fn) { say(''); busy(btn, true); try { await fn(); } catch (e) { say(errText(e)); } busy(btn, false); }
  function errText(e) {
    var m = (e && (e.message || e.code)) || '', s = e && e.status;
    if (/rate|429|seconds/i.test(m) || s === 429) return T.e.rate;
    if (/invalid login|credentials/i.test(m)) return T.e.login;
    if (/not confirmed/i.test(m)) return T.e.notConfirmed;
    if (/expired|invalid.*(otp|token)|token.*invalid/i.test(m)) return T.e.code;
    if (/signups not allowed|otp_disabled|user not found/i.test(m)) return T.e.noAccount;
    if (/parent_email/i.test(m)) return T.e.parent;
    if (/weak|short|least|characters/i.test(m)) return T.e.weak;
    if (/reauth|nonce|recent/i.test(m)) return T.e.reauth;
    return T.e.generic;
  }
  function view(nodes) { root.textContent = ''; root.appendChild(msgEl); nodes.forEach(function (n) { if (n) root.appendChild(n); }); }
  function gameUrl() { return CFG.game || 'https://game.blockracers.online'; }

  /* ---- uitgelogd: inloggen of account maken ---- */
  var resendAt = 0, PKEY = 'br_pending_verify';
  // Openstaande bevestiging bewaren, zodat een refresh geen nieuwe code (en dus een dode oude code) oplevert.
  function getPending() { try { var o = JSON.parse(sessionStorage.getItem(PKEY) || 'null'); return o && o.email && o.kind ? o : null; } catch (e) { return null; } }
  function setPending(email, kind) { try { sessionStorage.setItem(PKEY, JSON.stringify({ email: email, kind: kind, resendAt: resendAt })); } catch (e) {} }
  function clearPending() { try { sessionStorage.removeItem(PKEY); } catch (e) {} }
  function showOut(tab, email) {
    tab = tab || startTab;
    var em = h('input', { type: 'email', autocomplete: 'username email', maxlength: '120', class: 'acc-in', value: email || hintEmail || '' });
    var tabs = h('div', { class: 'acc-tabs', role: 'tablist' }, [
      h('button', { type: 'button', role: 'tab', 'aria-selected': String(tab === 'login'), text: T.tabLogin, onclick: function () { showOut('login', em.value.trim()); } }),
      h('button', { type: 'button', role: 'tab', 'aria-selected': String(tab === 'new'), text: T.tabNew, onclick: function () { showOut('new', em.value.trim()); } })
    ]);
    if (tab === 'login') {
      var pw = pwInput('accPw', 'current-password'), go;
      var form = h('form', { class: 'acc-form', novalidate: true, onsubmit: function (ev) {
        ev.preventDefault(); var e = em.value.trim().toLowerCase(), p = pw.firstChild.value;
        if (!EM.test(e)) return say(T.e.email); if (!p) return say(T.e.login);
        run(go, async function () { var r = await sb.auth.signInWithPassword({ email: e, password: p }); if (r.error) throw r.error; await showIn(); });
      } }, [field(T.email, em), field(T.pw, pw), go = h('button', { type: 'submit', class: 'br-btn br-btn--primary', text: T.login }),
        h('button', { type: 'button', class: 'acc-link', text: T.forgot, onclick: function () { showForgot(em.value.trim().toLowerCase()); } })]);
      view([tabs, form]);
    } else {
      var pw1 = pwInput('accNewPw', 'new-password'), age = null, mk;
      var r16 = h('input', { type: 'radio', name: 'accAge', value: 'o16' }), rU = h('input', { type: 'radio', name: 'accAge', value: 'u16' });
      var cons = h('input', { type: 'checkbox' }), consP = h('input', { type: 'checkbox' });
      var pBox = h('label', { class: 'acc-check', hidden: true }, [consP, ' ' + T.consentU16]);
      [r16, rU].forEach(function (r) { r.addEventListener('change', function () { age = r.value; pBox.hidden = age !== 'u16'; }); });
      var form2 = h('form', { class: 'acc-form', novalidate: true, onsubmit: function (ev) {
        ev.preventDefault(); var e = em.value.trim().toLowerCase(), p = pw1.firstChild.value;
        if (!EM.test(e) || e.length > 120) return say(T.e.email);
        if (p.length < 8) return say(T.e.pwShort);
        if (!age) return say(T.e.age);
        if (!cons.checked || (age === 'u16' && !consP.checked)) return say(T.e.consent);
        var pend = getPending();
        if (pend && pend.kind === 'signup' && pend.email === e) { resendAt = +pend.resendAt || 0; return showVerify(e, 'signup'); }
        if (pend) clearPending();
        run(mk, async function () {
          var r = await sb.auth.signUp({ email: e, password: p, options: { emailRedirectTo: location.origin + location.pathname, data: { under16: age === 'u16', consent: true, consent_at: new Date().toISOString() } } });
          if (r.error) throw r.error;
          if (r.data && r.data.session) return showIn();
          resendAt = Date.now() + 60e3; showVerify(e, 'signup');
        });
      } }, [h('p', { class: 'acc-note', text: T.newIntro }), field(T.email, em), field(T.pwNew, pw1),
        h('fieldset', { class: 'acc-age' }, [h('label', { class: 'acc-check' }, [r16, ' ' + T.age16]), h('label', { class: 'acc-check' }, [rU, ' ' + T.ageU16])]),
        h('label', { class: 'acc-check' }, [cons, ' ' + T.consent + ' ', h('a', { href: CFG.privacy, target: '_blank', rel: 'noopener', text: T.privacy })]), pBox,
        mk = h('button', { type: 'submit', class: 'br-btn br-btn--primary', text: T.create })]);
      view([tabs, form2]);
    }
    setTimeout(function () { (em.value ? root.querySelector('input[type=password]') : em).focus(); }, 0);
  }

  /* ---- code uit de mail (account bevestigen of wachtwoord vergeten) ---- */
  function showVerify(email, kind) {
    setPending(email, kind);
    var code = h('input', { inputmode: 'numeric', autocomplete: 'one-time-code', maxlength: '10', class: 'acc-in acc-code', placeholder: T.codePh }), ok, rs;
    function tick() { var left = Math.ceil((resendAt - Date.now()) / 1000); rs.disabled = left > 0; rs.textContent = left > 0 ? T.resend + ' (' + left + ')' : T.resend; if (left > 0) setTimeout(tick, 1000); }
    var form = h('form', { class: 'acc-form', novalidate: true, onsubmit: function (ev) {
      ev.preventDefault(); var c = code.value.replace(/\s/g, ''); if (c.length < 6) return say(T.e.code);
      run(ok, async function () {
        var r = await sb.auth.verifyOtp({ email: email, token: c, type: 'email' });
        if (r.error && kind === 'signup') r = await sb.auth.verifyOtp({ email: email, token: c, type: 'signup' });
        if (r.error) throw r.error;
        clearPending();
        if (kind === 'reset') showNewPw(); else await showIn();
      });
    } }, [h('p', { class: 'acc-note', text: kind === 'reset' ? T.resetSent(email) : T.codeSent(email) }), h('p', { class: 'acc-note', text: T.newest }), code,
      ok = h('button', { type: 'submit', class: 'br-btn br-btn--primary', text: T.confirm }),
      h('div', { class: 'acc-row' }, [
        rs = h('button', { type: 'button', class: 'acc-link', text: T.resend, onclick: function () {
          run(rs, async function () {
            var r = kind === 'reset' ? await sb.auth.signInWithOtp({ email: email, options: { shouldCreateUser: false } }) : await sb.auth.resend({ type: 'signup', email: email });
            if (r.error) throw r.error; resendAt = Date.now() + 60e3; setPending(email, kind); tick(); say(T.ok.resent, true);
          });
        } }),
        h('button', { type: 'button', class: 'acc-link', text: T.back, onclick: function () { showOut(kind === 'reset' ? 'login' : 'new', email); } })])]);
    view([form]); tick(); code.focus();
  }
  function showForgot(email) {
    var em = h('input', { type: 'email', autocomplete: 'username email', maxlength: '120', class: 'acc-in', value: email || '' }), go;
    var form = h('form', { class: 'acc-form', novalidate: true, onsubmit: function (ev) {
      ev.preventDefault(); var e = em.value.trim().toLowerCase(); if (!EM.test(e)) return say(T.e.email);
      run(go, async function () {
        var r = await sb.auth.signInWithOtp({ email: e, options: { shouldCreateUser: false } });
        if (r.error && !/signups not allowed|otp_disabled|not found/i.test(r.error.message || '')) throw r.error;
        resendAt = Date.now() + 60e3; showVerify(e, 'reset');
      });
    } }, [h('h3', { text: T.forgot }), field(T.email, em), go = h('button', { type: 'submit', class: 'br-btn br-btn--primary', text: T.sendCode }),
      h('button', { type: 'button', class: 'acc-link', text: T.back, onclick: function () { showOut('login', em.value.trim()); } })]);
    view([form]); em.focus();
  }
  function showNewPw() {
    var a = pwInput('accReset1', 'new-password'), b = pwInput('accReset2', 'new-password'), go;
    var form = h('form', { class: 'acc-form', novalidate: true, onsubmit: function (ev) {
      ev.preventDefault(); var p = a.firstChild.value;
      if (p.length < 8) return say(T.e.pwShort); if (p !== b.firstChild.value) return say(T.e.pwSame);
      run(go, async function () { var r = await sb.auth.updateUser({ password: p, data: { has_password: true } }); if (r.error) throw r.error; await showIn(); say(T.ok.pw, true); });
    } }, [h('h3', { text: T.changePw }), field(T.pwNew, a), field(T.pw2, b), go = h('button', { type: 'submit', class: 'br-btn br-btn--primary', text: T.save })]);
    view([form]); a.firstChild.focus();
  }

  /* ---- ingelogd: game-toegang en instellingen ---- */
  async function rpc(name, args) { var r = await sb.rpc(name, args || {}); if (r.error) throw r.error; return r.data; }
  async function claim(token) {
    try {
      var r = await fetch(CFG.url + '/functions/v1/invites', { method: 'POST', headers: { 'content-type': 'application/json', authorization: 'Bearer ' + token, apikey: CFG.key }, body: JSON.stringify({ action: 'claim' }) });
      return r.ok ? await r.json() : { status: 'pending', reason: 'error' };
    } catch (e) { return { status: 'pending', reason: 'error' }; }
  }
  async function showIn() {
    clearPending();
    var s = await sb.auth.getSession(), user = s.data && s.data.session && s.data.session.user;
    if (!user) return showOut('login');
    var status = 'none', reason = '';
    try { status = await rpc('invite_status'); } catch (e) { status = 'error'; }
    var u16 = !!(user.user_metadata && user.user_metadata.under16);
    // 16+: aanvraag vanzelf (toestemming gaf je bij account maken)
    if (status === 'none' && !u16) try { await rpc('request_invite', { parent_email: null, is_under16: false, consent: true }); status = 'pending'; } catch (e) {}
    // Automatische goedkeuring zolang er plek is. Code wordt aan het account gekoppeld, niemand vult hem in.
    if (status === 'pending' || status === 'sent') {
      var c = await claim(s.data.session.access_token);
      if (c.status === 'approved') status = 'used'; else reason = c.reason || '';
    }
    invite = ''; try { sessionStorage.removeItem('br.invite'); } catch (e) {}

    var card = h('section', { class: 'acc-card', 'aria-labelledby': 'accAccess' }, [h('h3', { id: 'accAccess', text: T.access })]);
    if (status === 'used') {
      card.appendChild(h('p', { class: 'acc-ok' }, [h('b', { text: T.used })]));
      card.appendChild(h('a', { class: 'br-btn br-btn--primary', href: gameUrl(), text: T.play }));
    } else if (status === 'pending' && reason === 'full') {
      card.appendChild(h('p', { text: T.full }));
    } else if (status === 'pending' && reason === 'parent') {
      card.appendChild(h('p', { text: T.pending }));
    } else if (status === 'pending') {
      card.appendChild(h('p', { text: T.busy }));
    } else if (status === 'error') {
      card.appendChild(h('p', { text: T.e.generic }));
    } else if (status === 'rejected') {
      card.appendChild(h('p', { text: T.rejected }));
    } else if (u16) {
      var pe = h('input', { type: 'email', autocomplete: 'off', maxlength: '120', class: 'acc-in' }), ab;
      card.appendChild(h('form', { class: 'acc-form', novalidate: true, onsubmit: function (ev) {
        ev.preventDefault(); var p = pe.value.trim().toLowerCase();
        if (!EM.test(p) || p === (user.email || '').toLowerCase()) return say(T.e.parent);
        run(ab, async function () { await rpc('request_invite', { parent_email: p, is_under16: true, consent: true }); await showIn(); say(T.ok.ask, true); });
      } }, [field(T.parentQ, pe), ab = h('button', { type: 'submit', class: 'br-btn br-btn--primary', text: T.ask })]));
    }
    card.appendChild(h('p', { class: 'acc-note', text: T.noRights }));

    var a = pwInput('accChg1', 'new-password'), b = pwInput('accChg2', 'new-password'), sv;
    var settings = h('details', { class: 'acc-card' }, [h('summary', { text: T.settings }),
      h('form', { class: 'acc-form', novalidate: true, onsubmit: function (ev) {
        ev.preventDefault(); var p = a.firstChild.value;
        if (p.length < 8) return say(T.e.pwShort); if (p !== b.firstChild.value) return say(T.e.pwSame);
        run(sv, async function () { var r = await sb.auth.updateUser({ password: p, data: { has_password: true } }); if (r.error) throw r.error; a.firstChild.value = b.firstChild.value = ''; say(T.ok.pw, true); });
      } }, [h('h4', { text: T.changePw }), field(T.pwNew, a), field(T.pw2, b), sv = h('button', { type: 'submit', class: 'br-btn br-btn--secondary', text: T.save })])]);
    var word = h('input', { class: 'acc-in', autocomplete: 'off', 'aria-label': 'VERWIJDER' }), del;
    word.addEventListener('input', function () { del.disabled = word.value.trim().toUpperCase() !== 'VERWIJDER'; });
    var danger = h('details', { class: 'acc-card acc-danger' }, [h('summary', { text: T.danger }), h('p', { text: T.dangerTxt }), word,
      del = h('button', { type: 'button', class: 'acc-del', disabled: true, text: T.del, onclick: function () {
        run(del, async function () { await rpc('delete_my_account'); clearPending(); try { await sb.auth.signOut(); } catch (e) {} showOut('login'); say(T.ok.deleted, true); });
      } })]);
    var lo;
    view([h('p', { class: 'acc-who' }, [T.who + ' ', h('b', { text: user.email || '' }), ' ',
      lo = h('button', { type: 'button', class: 'acc-link', text: T.logout, onclick: function () { run(lo, async function () { clearPending(); await sb.auth.signOut(); showOut('login'); }); } })]),
      card, settings, danger]);
  }

  sb.auth.getSession().then(function (r) { if (r.data && r.data.session) showIn().catch(function (e) { say(errText(e)); }); else { var pend = getPending(); if (pend) { resendAt = +pend.resendAt || 0; showVerify(pend.email, pend.kind); } else showOut(startTab); } })
    .catch(function () { showOut(startTab); });
})();

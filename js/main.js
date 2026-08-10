// Menu mobile
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
    });
  }

  // Formulaire de contact — envoi réel via FormSubmit (AJAX, sans backend à héberger)
  var form = document.querySelector('#contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      var original = btn.textContent;

      var nom = (form.nom.value || '').trim();
      var prenom = (form.prenom.value || '').trim();
      var email = (form.email.value || '').trim();
      var telephone = (form.telephone.value || '').trim();
      var sujet = (form.sujet.value || '').trim();

      // Objet du mail = mix de tous les champs sauf le message
      var subjectParts = [prenom, nom, sujet, telephone, email].filter(function (v) { return v; });
      var subject = 'Nouveau message du site — ' + subjectParts.join(' · ');

      var formData = new FormData(form);
      formData.set('_subject', subject);
      formData.set('_template', 'table');
      formData.set('_captcha', 'false');

      btn.disabled = true;
      btn.textContent = 'Envoi en cours...';

      fetch('https://formsubmit.co/ajax/loys.berthelier@hotmail.fr', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: formData
      })
        .then(function (res) {
          if (!res.ok) { throw new Error('send failed'); }
          return res.json();
        })
        .then(function () {
          btn.textContent = 'Message envoyé ✓';
          form.reset();
        })
        .catch(function () {
          btn.textContent = 'Erreur, réessayez';
        })
        .finally(function () {
          setTimeout(function () {
            btn.textContent = original;
            btn.disabled = false;
          }, 3000);
        });
    });
  }
});

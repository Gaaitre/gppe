// Menu mobile
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
    });
  }

  // Formulaire de contact — ouvre le client email du visiteur avec le message pré-rempli
  // (aucun service tiers, aucun backend : 100% front-end)
  var form = document.querySelector('#contact-form');
  var CONTACT_EMAIL = 'contact@gppe.fr';

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var nom = (form.nom.value || '').trim();
      var prenom = (form.prenom.value || '').trim();
      var email = (form.email.value || '').trim();
      var telephone = (form.telephone.value || '').trim();
      var sujet = (form.sujet.value || '').trim();
      var message = (form.message.value || '').trim();

      // Objet = mix de tous les champs sauf le message
      var subjectParts = [prenom, nom, sujet, telephone, email].filter(function (v) { return v; });
      var subject = 'Nouveau message du site — ' + subjectParts.join(' · ');

      // Corps = récapitulatif des champs + le message
      var bodyLines = [
        'Nom : ' + nom,
        'Prénom : ' + prenom,
        'E-mail : ' + email,
        'Téléphone : ' + (telephone || '—'),
        'Intéressé par : ' + sujet,
        '',
        'Message :',
        message
      ];
      var body = bodyLines.join('\n');

      var mailtoUrl = 'mailto:' + CONTACT_EMAIL
        + '?subject=' + encodeURIComponent(subject)
        + '&body=' + encodeURIComponent(body);

      window.location.href = mailtoUrl;
    });
  }
});

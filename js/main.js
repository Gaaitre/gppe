// Menu mobile
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
    });
  }

  // Formulaire de contact — envoi réel via FormSubmit (soumission classique, sans backend à héberger)
  var form = document.querySelector('#contact-form');
  if (form) {
    form.addEventListener('submit', function () {
      // On construit l'objet du mail juste avant l'envoi (mix de tous les champs sauf le message)
      var nom = (form.nom.value || '').trim();
      var prenom = (form.prenom.value || '').trim();
      var email = (form.email.value || '').trim();
      var telephone = (form.telephone.value || '').trim();
      var sujet = (form.sujet.value || '').trim();

      var subjectParts = [prenom, nom, sujet, telephone, email].filter(function (v) { return v; });
      var subjectField = form.querySelector('input[name="_subject"]');
      if (subjectField) {
        subjectField.value = 'Nouveau message du site — ' + subjectParts.join(' · ');
      }
      // Pas de preventDefault : le formulaire s'envoie normalement vers FormSubmit
    });
  }
});

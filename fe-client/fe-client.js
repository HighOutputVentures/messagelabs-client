const iframe = document.createElement('iframe');
const form = document.createElement('form');
const formInput = document.createElement('input');

iframe.src = 'https://mattermost-staging.identifi.com';
iframe.id = 'messagelabs-frame';
iframe.className = 'messagelabs-frame';
iframe.name = 'messagelabs-frame';
iframe.style.resize = 'both';
iframe.onload = function onload() {
  iframe.src = iframe.src;
  this.onload = null;
};

document.body.insertBefore(iframe, document.body.firstChild);

const authenticate = function authenticate(username, password) {
  form.target = 'messagelabs-frame';
  form.action = 'https://mattermost-staging.identifi.com/api/v4/users/login';
  form.method = 'post';
  form.enctype = 'text/plain';
  document.body.insertBefore(form, document.body.firstChild);

  formInput.name = JSON.stringify({ login_id: username, password });
  formInput.value = '';
  formInput.type = 'hidden';

  form.insertBefore(formInput, form.firstChild);
  form.submit();
};

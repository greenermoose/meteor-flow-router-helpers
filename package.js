Package.describe({
  git: 'https://github.com/greenermoose/meteor-flow-router-helpers.git',
  name: 'greenmoose:flow-router-helpers',
  summary: 'Template helpers for flow-router',
  version: '0.5.3'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');

  api.use([
    'check',
    'templating',
    'underscore'
  ]);

  api.use([
    'greenmoose:active-route-basic@0.0.1'
  ], ['client', 'server']);

  api.use([
    'kadira:flow-router@2.0.0'
  ], ['client', 'server'], {weak: true});

  api.imply('greenmoose:active-route-basic', ['client', 'server']);

  api.addFiles([
    'client/helpers.html'
  ], ['client']);

  api.addFiles([
    'client/helpers.js'
  ], ['client', 'server']);

  api.export('FlowRouterHelpers', 'server');
});

var FlowRouterHelpers, func, helpers, name, param, queryParam,
  slice = [].slice,
  hasProp = {}.hasOwnProperty;

subsReady = function() {
  var subs;
  subs = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  if (subs.length === 1) {
    return FlowRouter.subsReady();
  }
  subs = subs.slice(0, subs.length - 1);
  return _.reduce(subs, function(memo, sub) {
    return memo && FlowRouter.subsReady(sub);
  }, true);
};

pathFor = function(path, view) {
  var hashBang, query, ref;
  if (view == null) {
    view = {
      hash: {}
    };
  }
  if (!path) {
    throw new Error('no path defined');
  }
  if (!view.hash) {
    view = {
      hash: view
    };
  }
  if (((ref = path.hash) != null ? ref.route : void 0) != null) {
    view = path;
    path = view.hash.route;
    delete view.hash.route;
  }
  query = view.hash.query ? FlowRouter._qs.parse(view.hash.query) : {};
  hashBang = view.hash.hash ? view.hash.hash : '';
  return FlowRouter.path(path, view.hash, query) + (hashBang ? "#" + hashBang : '');
};

urlFor = function(path, view) {
  var relativePath;
  relativePath = pathFor(path, view);
  return Meteor.absoluteUrl(relativePath.substr(1));
};

param = function(name) {
  return FlowRouter.getParam(name);
};

queryParam = function(key) {
  return FlowRouter.getQueryParam(key);
};

currentRouteName = function() {
  return FlowRouter.getRouteName();
};

currentRouteOption = function(optionName) {
  return FlowRouter.current().route.options[optionName];
};

helpers = {
  subsReady: subsReady,
  pathFor: pathFor,
  urlFor: urlFor,
  param: param,
  queryParam: queryParam,
  currentRouteName: currentRouteName,
  currentRouteOption: currentRouteOption
};

if (Meteor.isClient) {
  for (name in helpers) {
    if (!hasProp.call(helpers, name)) continue;
    func = helpers[name];
    Template.registerHelper(name, func);
  }
}

if (Meteor.isServer) {
  FlowRouterHelpers = {
    pathFor: pathFor,
    urlFor: urlFor
  };
}

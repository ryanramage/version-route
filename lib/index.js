var path = require('path');
var exec = require('child_process').exec;

var commit_rev_cmd = "git rev-list HEAD --max-count=1";
var uncommitted_cmd = "git status --porcelain"
var commit_hash;

module.exports = function(cwd, opts){
  if (!opts) opts = {};
  if (!opts.path) opts.path = '/v';
  if (!opts.package_path) opts.package_path = path.resolve(cwd, './package.json');

  var git_opts = { cwd: cwd };

  var packag = require(opts.package_path);

  return {
    method: 'GET',
    path: opts.path,
    handler: function(req, reply){

      getCommitHash(git_opts, function(err, commit){
        reply({
          commit: commit,
          version: packag.version
        }).type('application/x-javascript');
      })
    }
  }
}


function getCommitHash(git_opts, cb) {

  if (commit_hash) return cb(null, commit_hash);

  exec(commit_rev_cmd, git_opts, function(err, stdout, stderr) {
    if (err) commit_hash = "Unknown";
    else commit_hash = stdout.trim();

    return cb(null, commit_hash);
  });
}




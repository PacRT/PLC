# PLC Boilerplate

## To-Do:

- ~~remove owner_id, issuer_id from MyDocs page~~
- provide Add Fields option to documents
- alert for incomplete/missing fields in Edit document modal
- Send Email invitation link with package if user not in PLC
- move to https
- create an inbox for users, and shared documents be showed in inbox
- Title editable in edit meta-data modal for docs
- editable tags for category in docs
- change `field_name` to `name`
- In `My Things` tab, show things owned by the user eg. if the user has an iPhone, or a camera - future goal to convert it to digital assets

## Installation:

### Install tools:

- `redis`
- `seaweedfs` : https://bintray.com/chrislusf/seaweedfs/seaweedfs
- `nodejs` : https://nodejs.org/en/download/package-manager/
- `bower` : `npm install bower -g`
- `gulp` : `npm install gulp -g`

### Run tools:

- `redis-server`
- Refer to setup instructions on https://github.com/chrislusf/seaweedfs/wiki/Getting-Started for how to setup seaweedfs. It has steps for standalone as well as docker setup.
- To start backend server, do `gulp node-app`
- To start frontend, do `gulp server`

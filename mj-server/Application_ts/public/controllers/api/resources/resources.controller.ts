import { IResources } from '../../../interfaces/iResourcesController';
import { IResourcesService } from '../../../interfaces/iResourcesService';
import { Resources } from '../../../models/resources';
import { ResourcesService } from '../../../services/resourcesService';
import { LogErrors } from '../../../common/logErrors.controller';

const MemoryStream = require('memorystream');
const multiparty = require('multiparty');
const fs = require('fs');

const azureStorage = require('azure-storage')
  , blobService = azureStorage.createBlobService()
  , containerName = 'blobstore';
import { v4 as uuidv4 } from 'uuid';



// The controller class is the entry point for the API calls.
// The controller's responsabilities are the following:

//      -   to implement the API calls.
//      -   to initiate the service class.
//      -   to call into the appropriate methods of the service class.
//      -   to return the service's methods results to the client.

// The controller is agnostic of the logic the service implements.
// The APIs are called via the following route: http://localhost:5200/Resources/

class ResourcesController implements IResources {
  private service: IResourcesService;

  constructor(router) {
    this.service = new ResourcesService();

    //router.get('/', this.getAllResources.bind(this));
    //router.get('/:id', this.getResourceById.bind(this));
    router.get('/downloadFile/:id', this.downloadFile.bind(this));
    router.post('/updateFileAndResources/:id', this.updateFileAndResources.bind(this));
    router.post('/saveFileandResource', this.saveFileAndResourcesMJ.bind(this));
    router.post('/saveFileandResourceId/:id', this.updateFileAndResourcesMJ.bind(this));
    //router.post('/deleteResources/:id', this.deleteResources.bind(this));

    router.get('/', this.getAllPublishedResource.bind(this));
    router.get('/allresources', this.getAllResource.bind(this));
    router.get('/:id', this.getResourceById.bind(this));
    router.post('/insert', this.insertResource.bind(this));
    router.post('/update/:id', this.updateResource.bind(this));
    router.post('/publish/:id', this.publishArchiveResource.bind(this));
    router.delete('/:id', this.deleteResource.bind(this));
    router.get('/checkIfFileExists/:id', this.checkIfFileExists.bind(this));
    router.get('/downloadFilePreview/:id', this.downloadFilePreview.bind(this));
  }

  getAllResource(req: any, res: any, next: any): Promise<any> {
    return this.service
      .getAllResource(req, res, next)
      .then(results => {
        res.json(results)
      })
      .catch(err => {
        console.log(err)
      });
  }

  getAllPublishedResource(req: any, res: any, next: any): Promise<any> {
    return this.service
      .getAllPublishedResource(req, res, next)
      .then(results => res.json(results))
      .catch(err => {
        next(err);
      });
  }

  getResourceById(req: any, res: any, next: any): Promise<any> {
    return this.service
      .getResourceById(req, res, next)
      .then(results => res.json(results))
      .catch(err => {
        next(err);
      });
  }

  insertResource(req: any, res: any, next: any): Promise<any> {
    return this.service
      .insertResource(req, res, next)
      .then(results => res.json(results))
      .catch(err => {
        next(err);
      });
  }
  updateResource(req: any, res: any, next: any): Promise<any> {
    return this.service
      .updateResource(req, res, next)
      .then(results => res.json(results))
      .catch(err => {
        next(err);
      });
  }
  publishArchiveResource(req: any, res: any, next: any): Promise<any> {
    return this.service
      .publishArchiveResource(req, res, next)
      .then(results => res.json(results))
      .catch(err => {
        next(err);
      });
  }

  deleteResource(req: any, res: any, next: any): Promise<any> {
    let response;
    var self = this;
    let id = req.params.id;
    if(id){
      self.service.getOldFileName(id, next).then(
        result => {
          if(result){
            blobService.deleteBlobIfExists(containerName, result, (err, result) => {
              if (err) {
                console.log("Delete blob error " + result + " the error is: " + err);
                self.handleUploadError(err, res);
              }
              else {
                return this.service
                .deleteResource(req, res, next)
                .then(results => res.json(results))
                .catch(err => {
                  next(err);
                });
              }
            });

          }else{
            return this.service
            .deleteResource(req, res, next)
            .then(results => res.json(results))
            .catch(err => {
              next(err);
            });
          }
        });
    }

    return response;
   
  }

  updateFileAndResourcesMJ(req: any, res: any, next: any): void {
    var formFields: any[] = [];
    var fileName: string;
    var file: any;
    var parsedFields: boolean = false;

    var form = new multiparty.Form();
    var resource = new Resources();
    var self = this;

    
    let id = req.params.id;

    form.on('field', (name, value) => {
      Object.keys(resource).forEach(key => {
        if (key == name) {
          resource[key] = value;
        }
      });
    });
    form.on('error', err => {
      self.handleUploadError(err, res);
    });

    form.on('part', (part) => {
      fileName = part.filename;
      file = part;
      //resource.fileName = uuidv4()+"_"+fileName;;
      let src = resource.SourceID;
      if(src==2){
        if (file) {
          if (fileName != "") {
            //fileName = uuidv4() + "_" + fileName;
            //resource.fileName = fileName;
            //------------check if file exist in database-------//
            
  
            self.service.getNumberOfRecordsForAFileWithID(fileName, id, next).then(
              result => {
                console.log('------------check file exist result below------');
                console.log(result);
                if (result == 1) {
                  //---------update other informations only not blob----------//
                  console.log('----------file is same update other info---');
                  resource.fileName = fileName;
                  console.log(resource);
                  self.updateDatabase(req, res, resource, fileName, next);
                } else {
  
                  console.log('---------------New files is uploaded to be updated-----------');
                  self.service.getOldFileName(id, next).then(
                    result => {
                      console.log(result);
                      if (result) {
                        //----Remove old file from blob--------//
                        blobService.deleteBlobIfExists(containerName, result, (err, result) => {
                          if (err) {
                            console.log("Delete Blob Error " + result + " the error is: " + err);
                            self.handleUploadError(err, res);
                          }
                          else {
  
                            fileName = uuidv4() + "_" + fileName;
                            resource.fileName = fileName;
  
                            var size = part.byteCount;
                            blobService.createBlockBlobFromStream(containerName, fileName, file, size, function (err) {
                              if (err) {
                                console.log("Upload blob Error " + fileName);
                                self.handleUploadError(err, res);
                              }
                              else {
                                self.updateDatabase(req, res, resource, fileName, next);
                              }
                            });
                          }
                        });
                      } else {
                        console.log('-------coming form change of src----------');
                        //-----it might be option 2 of coming from or change of source
                        fileName = uuidv4() + "_" + fileName;
                        resource.fileName = fileName;
  
                        var size = part.byteCount;
                        blobService.createBlockBlobFromStream(containerName, fileName, file, size, function (err) {
                          if (err) {
                            console.log("Upload blob Error " + fileName);
                            self.handleUploadError(err, res);
                          }
                          else {
                            console.log("New record added to database" + fileName);
                            self.updateDatabase(req, res, resource, fileName, next);
                          }
                        });
                      }
                    });
                  console.log('------end----');
  
  
                }
              });
  
  
          } else {
            console.log('----------No file name some issue you have to check---');
          }
  
        }
      }else{
        
        console.log('--------------No file choosen------------');
        if (file) {
          if (fileName != "") {
            let result = fileName;
            blobService.deleteBlobIfExists(containerName, result, (err, result) => {
              if (err) {
                self.handleUploadError(err, res);
              }
              else {
                fileName = uuidv4() + "_" + fileName;
                resource.fileName = "";
                self.updateDatabase(req, res, resource, fileName, next);
              }
            });
          }else{
            self.updateDatabase(req, res, resource, fileName, next);
          }
        }else{
          self.updateDatabase(req, res, resource, fileName, next);
        }
        
      }
      
    });

    form.on('close', function () {
      console.log('----form closed-----');
      if(fileName==null){

        self.service.getOldFileName(id, next).then(
          result => {
            console.log(result);
            if(result){
               //----Remove old file from blob--------//
               blobService.deleteBlobIfExists(containerName, result, (err, result) => {
                if (err) {
                  console.log("Delete blob error " + result + " the error is: " + err);
                  self.handleUploadError(err, res);
                }
                else {
                  self.updateDatabase(req, res, resource, fileName, next);
                }
            });
          }else{
            self.updateDatabase(req, res, resource, fileName, next);
          }
        });
        
      }else{
        console.log('-----------change of src to file------------');
      }
    });

    form.on('error', function (err) {
      console.log('Error parsing form: ' + err.stack);
      LogErrors.logErrors(err);
    });

    form.parse(req);

  }

  saveFileAndResourcesMJ(req: any, res: any, next: any): void {
    var formFields: any[] = [];
    var fileName: string;
    var file: any;
    var parsedFields: boolean = false;

    var form = new multiparty.Form();
    var resource = new Resources();
    var self = this;

    form.on('field', (name, value) => {
      Object.keys(resource).forEach(key => {
        if (key == name) {
          resource[key] = value;
        }
      });
    });
    form.on('error', err => {
      self.handleUploadError(err, res);
    });

    form.on('part', (part) => {
      fileName = part.filename;
      file = part;
      //resource.fileName = uuidv4()+"_"+fileName;;

      if (file) {
        if (fileName != "") {
          fileName = uuidv4() + "_" + fileName;
          resource.fileName = fileName;
          //console.log(rFileName);
          // logic to delete the previously saved file for this record if there are no more records linked to that file
          let id = req.params.id;
          if (id > 0) {
            console.log('-------id id greater then 0-------');
          } else {
            console.log('------------Id is 0----------');
            var size = part.byteCount;

            blobService.createBlockBlobFromStream(containerName, fileName, file, size, function (err) {
              if (err) {
                console.log("Create Blob Error " + fileName);
                self.handleUploadError(err, res);
              }
              else {
                console.log("New record added to database" + fileName);
                self.updateDatabase(req, res, resource, fileName, next);
              }
            });
          }
        }

      }
    });

    form.on('close', function () {
      console.log('----form closed-----');
      if(fileName==null){
        self.updateDatabase(req, res, resource, fileName, next);
      }else{
        console.log('-------------no actions-----------');
      }
    });

    form.on('error', function (err) {
      console.log('Error parsing form: ' + err.stack);
      LogErrors.logErrors(err);
    });

    form.parse(req);

  }


  updateFileAndResources(req: any, res: any, next: any): void {
    var formFields: any[] = [];
    var fileName: string;
    var file: any;
    var parsedFields: boolean = false;

    var form = new multiparty.Form();
    var resource = new Resources();
    var self = this;

    form.on('field', (name, value) => {
      Object.keys(resource).forEach(key => {
        if (key == name) {
          resource[key] = value;
        }
      });
    });
    form.on('error', err => {
      self.handleUploadError(err, res);
    });

    form.on('part', (part) => {
      fileName = part.filename;
      file = part;
      resource.fileName = fileName;
      if (file) {
        if (fileName != "") {
          // logic to delete the previously saved file for this record if there are no more records linked to that file

          let id = req.params.id;

          if (id > 0) {
            // check if a file was saved in the database prior to this call          
            self.service.getResourceById(req, res, next).then
              (
                results => {
                  let resource = results[0];

                  if (resource.fileName != "") {
                    let savedFileName = resource.fileName;

                    // check to see if there are other records linked to this file

                    self.service.getNumberOfRecordsForAFile(savedFileName, next).then(
                      result => {
                        if (result == 1) {
                          blobService.deleteBlobIfExists(containerName, savedFileName, (err, result) => {
                            if (err) {
                              // else return error   
                              console.log("updateFileAndResources: case 1) -- cannot delete the previously saved blob file: " + savedFileName + " the error is: " + err);
                              self.handleUploadError(err, res);
                            }
                            else {
                              console.log("updateFileAndResources: case 1) -- successfully deleted the the previously saved blob file: " + savedFileName);
                            }
                          });
                        }
                      });
                  }
                });
          }

          blobService.doesBlobExist(containerName, fileName, function (err, result) {
            if (result.exists) {
              console.log("updateFileAndResources: case 1) -- file exists in Azure storage");

              // check to see if there are other records linked to this file

              self.service.getNumberOfRecordsForAFile(fileName, next).then(
                result => {

                  if (result >= 1) {
                    // case 1)
                    // since there is only one file in the Azure storage, delete the file and upload it again
                    // the latest version of the file it is saved, even if a file with the same name is uploaded
                    // if the Azure Blob operations succeed then update the database 

                    blobService.deleteBlobIfExists(containerName, fileName, (err, result) => {
                      if (err) {
                        // else return error   
                        console.log("updateFileAndResources: case 1) -- cannot delete the blob file: " + fileName + " the error is: " + err);
                        self.handleUploadError(err, res);
                      }
                      else {

                        console.log("updateFileAndResources: case 1) -- successfully deleted the blob file: " + fileName);

                        // upload the new file into Azure Storage
                        var size = part.byteCount;

                        blobService.createBlockBlobFromStream(containerName, fileName, file, size, function (err) {
                          if (err) {
                            console.log("updateFileAndResources: case 1) -- cannot upload the new blob file: " + fileName);
                            self.handleUploadError(err, res);
                          }
                          else {
                            console.log("updateFileAndResources: case 1) -- successfully uploaded the new blob file: " + fileName);
                            self.updateDatabase(req, res, resource, fileName, next);
                          }
                        });
                      }
                    });
                  }
                  /*
                  else
                  {
                      // update the database
                      console.log("updateFileAndResources: case 1) -- successfully updated the database. More than one items are linked to the file: " + fileName);
                      self.updateDatabase(req, res, resource, fileName, next);           
                  }
                  */
                });

            }
            else {
              console.log("updateFileAndResources:file does not exists in Azure storage");

              // case 2)
              // since the file does not exists in the Azure storage, upload it for the first time
              var size = part.byteCount;

              blobService.createBlockBlobFromStream(containerName, fileName, file, size, function (err) {
                if (err) {
                  // else return error
                  console.log("updateFileAndResources: case 2) -- cannot upload the new blob file: " + fileName);
                  self.handleUploadError(err, res);
                }
                else {
                  // if the Azure Blob operations succeed then update the database
                  console.log("updateFileAndResources: case 2) -- successfully uploaded the new blob file: " + fileName);

                  self.updateDatabase(req, res, resource, fileName, next);
                }
              });
            }
          });
        }
      }
      else {
        // no file has been uploaded from the client
        console.log("updateFileAndResources: case 3) -- no file has been uploaded from the client");

        let id = req.params.id;

        if (id > 0) {
          // check if a file was saved in the database prior to this call          
          self.service.getResourceById(req, res, next).then
            (
              results => {
                let resource = results[0];
                if (resource.fileName != "") {
                  // check to see if there are other records linked to this file

                  self.service.getNumberOfRecordsForAFile(fileName, next).then(
                    result => {
                      if (result == 1) {
                        // case 3)
                        // if there are no other records linked to this file then delete the file from Azure storage

                        blobService.deleteBlobIfExists(containerName, fileName, (err, result) => {
                          if (err) {
                            // else return error   
                            console.log("updateFileAndResources: case 3) -- cannot delete the blob file: " + name + " the error is: " + err);
                            self.handleUploadError(err, res);
                          }
                          else {
                            // if the Azure Blob delete succeed then update the database with an empty value for the file name 
                            console.log("updateFileAndResources: case 3) -- deleted the blob file: " + name);
                            req.hasBeenDeleted = true;
                            self.updateDatabase(req, res, resource, fileName, next);
                          }
                        });
                      }
                      else {
                        // case 4)
                        // if there are more than one record then do not delete the file from Azure storage
                        // update the database with an empty value for the file name

                        console.log("updateFileAndResources: case 4 -- successfully updated the database. The file stays the same: " + fileName);
                        req.hasBeenDeleted = true;
                        self.updateDatabase(req, res, resource, fileName, next);
                      }
                    })
                    .catch(err => {
                      next(err);
                    });
                }
                else {
                  // case 5)
                  // the previously saved record does not reference a file
                  console.log("updateFileAndResources: case 5 --  successfully updated the database. The previously saved record does not reference a file");
                  self.updateDatabase(req, res, resource, fileName, next);
                }
              }
            );
        }
        else {

          // this is a new record
          console.log("updateFileAndResources: case 6 -- successfully updated the database. This is a new record");
          self.updateDatabase(req, res, resource, fileName, next);
        }

      }
    });


    form.on('close', function () {
      if (resource.fileName == "") {
        let fileName = "";

        // no file has been uploaded from the client
        console.log("updateFileAndResources: case 3) -- no file has been uploaded from the client");

        let id = req.params.id;

        if (id > 0) {
          // check if a file was saved in the database prior to this call          
          self.service.getResourceById(req, res, next).then
            (
              results => {

                if (resource.fileName != "") {
                  let resource = results[0];
                  let savedFileName = resource.fileName;
                  // check to see if there are other records linked to this file

                  self.service.getNumberOfRecordsForAFile(savedFileName, next).then(
                    result => {
                      if (result == 1) {
                        // case 3)
                        // if there are no other records linked to this file then delete the file from Azure storage

                        blobService.deleteBlobIfExists(containerName, savedFileName, (err, result) => {
                          if (err) {
                            // else return error   
                            console.log("updateFileAndResources: case 3) -- cannot delete the blob file: " + savedFileName + " the error is: " + err);
                            self.handleUploadError(err, res);
                          }
                          else {
                            // if the Azure Blob delete succeed then update the database with an empty value for the file name 
                            console.log("updateFileAndResources: case 3) -- deleted the blob file: " + savedFileName);
                            req.hasBeenDeleted = true;
                            self.updateDatabase(req, res, resource, fileName, next);
                          }
                        });
                      }
                      else {
                        // case 4)
                        // if there are more than one record then do not delete the file from Azure storage
                        // update the database with an empty value for the file name

                        console.log("updateFileAndResources: case 4 -- successfully updated the database. The file stays the same: " + savedFileName);
                        req.hasBeenDeleted = true;
                        self.updateDatabase(req, res, resource, fileName, next);
                      }
                    })
                    .catch(err => {
                      next(err);
                    });
                }
                else {
                  console.log(resource);
                  // case 5)
                  // the previously saved record does not reference a file
                  console.log("updateFileAndResources: case 5 --  successfully updated the database. The previously saved record does not reference a file");
                  self.updateDatabase(req, res, resource, fileName, next);
                }
              }
            );
        }
        else {
          // this is a new record
          console.log("updateFileAndResources: case 6 -- successfully updated the database. This is a new record");
          self.updateDatabase(req, res, resource, fileName, next);
        }
      }

    });

    form.on('error', function (err) {
      console.log('Error parsing form: ' + err.stack);
      LogErrors.logErrors(err);
    });

    form.parse(req);
  }

  private updateDatabase(req: any, res: any, resource: any, fileName: string, next: any): void {
    this.service.saveOrUpdateResources(req, res, resource, fileName, next)
      .then(results => {
        res.json(results)
      })
      .catch(err => {
        next(err);
      });
  }

  handleUploadError(err, res) {
    LogErrors.logErrors(err);
    res.json({ error: err });
  };

  downloadFile(req: any, res: any, next: any): void {
    let resourceID = req.params.id;

    this.service.getResourceById(req, res, next).then(
      results => {
        let resource = results[0];
        if (resource.fileName == "" || resource.fileName == null) {
          return res.send(null);
        }
        else {
          let blobName = resource.fileName;

          const writable = new MemoryStream();
          //var writable = fs.createWriteStream(blobName);

          blobService.getBlobToStream(containerName, blobName,
            writable, function (err, result, response) {
              if (err) {

                console.log("downloadFile:cannot download the blob file: " + blobName);
                console.log(err);

                let localResults = ({ status: err.code, message: err.message });

                return res.send(null);
              }
              else {

                console.log("downloadFile:downloaded successfully the blob file: " + blobName);

                res.setHeader('Content-disposition', 'attachment; filename=' + blobName);
                res.setHeader('Content-type', result.contentSettings.contentType);

                blobService.createReadStream(containerName, blobName).pipe(res);
              }
            });
        }
      }
    ).
      catch(err => {
        next(err);
      })
  }


  checkIfFileExists(req: any, res: any, next: any): any {
    console.log('----------checking if file exists --------');
    let resourceID = req.params.id;

    this.service.getResourceById(req, res, next).then(results => {
      let blobName = results[0].fileName;
      const writable = new MemoryStream();
      //var writable = fs.createWriteStream(blobName);

      blobService.getBlobToStream(containerName, blobName, writable, function (
        err,
        result,
        response
      ) {
        if (err) {
          res.json(false);
        } else {
          res.json(true);
        }
      });
    });
  }

  downloadFilePreview(req: any, res: any, next: any): void {
    this.service
      .getResourceById(req, res, next)
      .then(results => {
        try {
          let blobName = results[0].fileName;
          const writable = new MemoryStream();

          blobService.getBlobToStream(
            containerName,
            blobName,
            writable,
            function (err, result, response) {
              //function(err, result, response) {
              if (err) {
                this.logger.LogErrors(err);
                return res.send(null);
              } else {
                res.setHeader(
                  'Content-disposition',
                  'attachment; filename=' + blobName
                );
                res.setHeader(
                  'Content-type',
                  result.contentSettings.contentType
                );

                blobService.createReadStream(containerName, blobName).pipe(res);
              }
            }
          );
        } catch (err) {
          console.log('----Error------');
          LogErrors.logErrors(err);
        }
      })
      .catch(err => {
        console.log('--------Error last-------');
        LogErrors.logErrors(err);

        next(err);
      });
  }


}

module.exports = ResourcesController;

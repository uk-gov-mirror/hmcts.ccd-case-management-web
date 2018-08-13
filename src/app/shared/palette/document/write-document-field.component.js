"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var abstract_field_write_component_1 = require("../base-field/abstract-field-write.component");
var forms_1 = require("@angular/forms");
var material_1 = require("@angular/material");
var document_dialog_component_1 = require("../../document-dialog/document-dialog.component");
var WriteDocumentFieldComponent = /** @class */ (function (_super) {
    __extends(WriteDocumentFieldComponent, _super);
    function WriteDocumentFieldComponent(documentManagement, dialog) {
        var _this = _super.call(this) || this;
        _this.documentManagement = documentManagement;
        _this.dialog = dialog;
        _this.valid = true;
        return _this;
    }
    WriteDocumentFieldComponent.prototype.initDialog = function () {
        this.dialogConfig = new material_1.MatDialogConfig();
        this.dialogConfig.disableClose = true;
        this.dialogConfig.autoFocus = true;
        this.dialogConfig.ariaLabel = 'Label';
        this.dialogConfig.height = '245px';
        this.dialogConfig.width = '550px';
        this.dialogConfig.panelClass = 'dialog';
        this.dialogConfig.closeOnNavigation = false;
        this.dialogConfig.position = {
            top: window.innerHeight / 2 - 120 + 'px', left: window.innerWidth / 2 - 275 + 'px'
        };
    };
    WriteDocumentFieldComponent.prototype.ngOnInit = function () {
        this.initDialog();
        var document = this.caseField.value;
        if (document) {
            this.createDocumentGroup(document.document_url, document.document_binary_url, document.document_filename);
        }
    };
    WriteDocumentFieldComponent.prototype.fileChangeEvent = function (fileInput) {
        var _this = this;
        if (fileInput.target.files[0]) {
            this.selectedFile = fileInput.target.files[0];
            // Perform the file upload immediately on file selection
            var documentUpload = new FormData();
            documentUpload.append('files', this.selectedFile, this.selectedFile.name);
            documentUpload.append('classification', 'PUBLIC');
            this.documentManagement.uploadFile(documentUpload).subscribe(function (result) {
                if (!_this.uploadedDocument) {
                    _this.createDocumentGroup();
                }
                var document = result._embedded.documents[0];
                _this.setDocumentGroupValues(document._links.self.href, document._links.binary.href, document.originalDocumentName);
                _this.valid = true;
            }, function (error) {
                _this.uploadError = _this.getErrorMessage(error);
                _this.valid = false;
            });
        }
        else {
            this.selectedFile = null;
            this.valid = true;
        }
    };
    WriteDocumentFieldComponent.prototype.createDocumentGroup = function (url, binaryUrl, filename) {
        this.uploadedDocument = this.registerControl(new forms_1.FormGroup({
            document_url: new forms_1.FormControl(url),
            document_binary_url: new forms_1.FormControl(binaryUrl),
            document_filename: new forms_1.FormControl(filename)
        }));
    };
    WriteDocumentFieldComponent.prototype.setDocumentGroupValues = function (url, binaryUrl, filename) {
        this.uploadedDocument.get('document_url').setValue(url);
        this.uploadedDocument.get('document_binary_url').setValue(binaryUrl);
        this.uploadedDocument.get('document_filename').setValue(filename);
    };
    WriteDocumentFieldComponent.prototype.getErrorMessage = function (error) {
        // Document Management unavailable
        if (0 === error.status || 502 === error.status) {
            return 'Document upload facility is not available at the moment';
        }
        return error.error;
    };
    WriteDocumentFieldComponent.prototype.openFileDialog = function () {
        this.fileInput.nativeElement.click();
    };
    WriteDocumentFieldComponent.prototype.fileSelectEvent = function () {
        if (this.caseField.value) {
            this.openDialog(this.dialogConfig);
        }
        else {
            this.openFileDialog();
        }
    };
    WriteDocumentFieldComponent.prototype.openDialog = function (dialogConfig) {
        var _this = this;
        var dialogRef = this.dialog.open(document_dialog_component_1.DocumentDialogComponent, dialogConfig);
        dialogRef.beforeClose().subscribe(function (result) {
            _this.confirmReplaceResult = result;
            _this.triggerReplace();
        });
    };
    WriteDocumentFieldComponent.prototype.triggerReplace = function () {
        if (this.confirmReplaceResult === 'Replace') {
            this.openFileDialog();
        }
    };
    __decorate([
        core_1.ViewChild('fileInput')
    ], WriteDocumentFieldComponent.prototype, "fileInput", void 0);
    WriteDocumentFieldComponent = __decorate([
        core_1.Component({
            selector: 'ccd-write-document-field',
            templateUrl: './write-document-field.html'
        })
    ], WriteDocumentFieldComponent);
    return WriteDocumentFieldComponent;
}(abstract_field_write_component_1.AbstractFieldWriteComponent));
exports.WriteDocumentFieldComponent = WriteDocumentFieldComponent;

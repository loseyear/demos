define(function(require, exports, module){

    var $ = require('jquery');
    var upload = {};

    upload = function(data) {
        upload.input(data);

        $(data.el + ' input').on('change', function(){
            var file = this.files;
            for (var i = 0; i < file.length; i++) {

                if ( !upload.size(file[i], data) ) {
                    data.error('size not match');
                    return false;
                };

                if ( !upload.type(file[i], data) ) {
                    data.error('type not match');
                    return false;
                };

                if ( upload.isImg(file[i]) ) {
                    upload.measure(file[i], data);
                } else {
                    upload.file(file[i], data);
                }

            };

        });
    }

    upload.isImg = function(file) {
        var imgType = [
            'jpg',
            'jpeg',
            'png',
            'gif',
            'tiff'
        ];
        var fileType = (file.name).match(/([a-z]*$)/g);
        return $.inArray(fileType[0], imgType) != -1 ? true : false;
    };

    upload.type = function(file, data) {
        var dataType = (data.type.replace(/\s/g, '')).split(';');
        var fileType = (file.name).match(/([a-z]*$)/g);
        return $.inArray(fileType[0], dataType) != -1 ? true : false;
    }

    upload.input = function(data) {
        $(data.el).addClass(data.buttonClass);
        /*
        var css=function(t,s){
            s=document.createElement('style');
            s.innerText=t;
            document.body.appendChild(s);
        };

        css(data.el + "::before{content:'" + data.buttonText + "'}");
        */

        if(data.mulit) {
            var inputHTML = data.buttonText + '<input type="file" multiple style="height:100%;width:100%;opacity:0;">';
        } else {
            var inputHTML = data.buttonText + '<input type="file" style="height:100%;width:100%;opacity:0;">';
        }
        $(data.el).html(inputHTML);
    }

    upload.size = function(file, data) {
        if (data.size.length > 0) {
            size = file.size ? Math.floor(file.size / 1024) : '';
            return size <= data.size ? true : false;
        } else {
            return true;
        }
    }

    upload.measure = function(file, measure) {
        var reader = new FileReader();
        var width, height;

        reader.onload = function (e) {
            var data = e.target.result;
            var image = new Image();

            image.onload = function(){
                width = image.width;
                height = image.height;

                var img = {};
                    img.width = image.width;
                    img.height = image.height;
                    console.log(img);

                if (measure.height && measure.width) {
                    var isWidthHeight = measure.width == image.width && image.height == measure.height;
                    isWidthHeight ? upload.file(file, measure, img) : measure.error('measure not match');
                } else if (measure.width) {
                    image.width == measure.width ? upload.file(file, measure, img) : measure.error('measure not match');
                } else if (measure.height) {
                    image.height == measure.height ? upload.file(file, measure, img) : measure.error('measure not match');
                } else {
                    upload.file(file, measure, img);
                };
            };

            image.src= data;

        };

        reader.readAsDataURL(file, measure);
    }

    upload.file = function(file, data, img) {
        var xhr = new XMLHttpRequest();
        var fileData = new FormData();
            fileData.append("name", encodeURIComponent(file.name));
            fileData.append("Filedata", file);
            for (x in data.formData) {
                fileData.append(x, data.formData[x]);
            }

        $.ajax({
            type: data.methed,
            url : data.url,
            data: fileData,
            contentType: false,
            processData: false,
            xhr: function() {
                return xhr
            }
        }).then(function(result) {
            if(img) {
                data.success(file, JSON.stringify(result), JSON.stringify(img) );
            } else {
                data.success(file, JSON.stringify(result));
            }

        }, function(error) {
            data.error(error);
        })
    }

    module.exports = upload;
});

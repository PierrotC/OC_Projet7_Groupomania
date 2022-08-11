const multer = require('multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        const name = file.originalname.split(/[ .]/g);
        name.splice(-1, 1);

        
        const ext = MIME_TYPES[file.mimetype];

        // cb(null, name.join('_') + '_' + Date.now() + '.' + ext);
        
        if(!ext) {
            cb(null, false);
        } else {
            cb(null, name.join('_') + '_' + Date.now() + '.' + ext);
        };
    }
});

module.exports = multer({ storage: storage }).single('image');
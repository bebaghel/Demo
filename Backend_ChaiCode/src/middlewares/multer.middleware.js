// import multer from 'multer';

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './public/tmp')
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + "_" + Math.round
//         (Math.random() * 1E9)
//         cb(null, file.fieldname + "-" + uniqueSuffix)
//     }
// })

// export const upload = multer({storage, })

// middlewares/multer.middleware.js
import multer from 'multer';

// Set up storage configuration for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/temp'); // Set your upload folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Save file with unique name
    }
});

const upload = multer({ storage });

export { upload };

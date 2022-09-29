import multer from 'multer'
import { fileURLToPath } from 'url'
import path from 'path'
const __filename = fileURLToPath(import.meta.url)


export const storageMulter = ({ folderPath }) => multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, path.join(__filename, `../../../public/images/${folderPath}`))
	},
	filename: (req, file, cb) => {
		cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
	},
})

const whitelist = [
	'image/png',
	'image/jpeg',
	'image/jpg',
	'image/webp'
]

export const filterFile = (req, file, cb) => {
	const fileSize = parseInt(req.headers["content-length"])
	if (!whitelist.includes(file.mimetype)) {
		return cb(new Error('file is not image'))
	}else if(fileSize >= 1048576){
		return cb(new Error('Maximum file 1MB'))
	}
	cb(null, true)
}




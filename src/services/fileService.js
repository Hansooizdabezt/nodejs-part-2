const path = require("path");
const fs = require("fs"); //file system

const uploadSingleFile = async (fileObject) => {
    const uploadDir = path.join(__dirname, "../../src/public/images/upload");

    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true }); // `{ recursive: true }` giúp tạo cả thư mục cha nếu chưa có
    }

    let extName = path.extname(fileObject.name);

    let basename = path.basename(fileObject.name, extName);

    let finalName = `${basename}-${Date.now()}${extName}`;
    let finalPath = path.join(uploadDir, finalName);


    try {
        await fileObject.mv(finalPath);
        return {
            status: 'success',
            path: "link-image",
            error: null
        }
    } catch (error) {
        console.log("check error: ", error)
        return {
            status: 'failed',
            path: null,
            error: JSON.stringify(error)
        }
    }
}

const uploadMultipleFiles = async (filesArr) => {
    try {
        const uploadDir = path.join(__dirname, "../public/images/upload");

        // 🔥 Kiểm tra và tạo thư mục nếu chưa tồn tại
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        let resultArr = [];
        let countSuccess = 0;

        for (let i = 0; i < filesArr.length; i++) {
            let extName = path.extname(filesArr[i].name);
            let basename = path.basename(filesArr[i].name, extName);

            let finalName = `${basename}-${Date.now()}${extName}`;
            let finalPath = path.join(uploadDir, finalName);

            try {
                await filesArr[i].mv(finalPath);
                resultArr.push({
                    status: 'success',
                    path: finalName,
                    finalName: filesArr[i].name,
                    error: null
                });
                countSuccess++;
            } catch (error) {
                resultArr.push({
                    status: 'failed',
                    path: null,
                    finalName: filesArr[i].name,
                    error: JSON.stringify(error)
                });
            }
        }
        return {
            status: "completed",
            totalFiles: filesArr.length,
            successCount: countSuccess,
            results: resultArr
        };
    } catch (error) {
        console.log(error);
    }

};

module.exports = { uploadSingleFile, uploadMultipleFiles }
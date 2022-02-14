const express = require("express");
const cors = require("cors");
const multer = require('multer')
const path = require('path')

const app = express();

var corsOptions = {
  origin: true,
  credentials: true
};
app.use(express.static(path.join(__dirname+'/images')))// 정적 파일 위치 설정
app.use(express.json()) //json 데이터 parser
app.use(express.urlencoded({extended:false})) // 내부 url parser 사용
app.use(cors(corsOptions))

app.get('/',(req,res)=>{
  res.status(200).json({message:"test server"})
})

const upload = multer({
  storage:multer.diskStorage({
    //저장할 장소
    destination(req,file,cb){
      cb(null,'images/uploads')
    },
    filename(req,file,cb){
      const ext = path.extname(file.originalname) //파일의 확장자
      console.log(file.originalname)
      //파일명이 절대 겹치지 않도록 해야한다.
      //파일이름 + 현재시간밀리초 + 파일 확장자명
      cb(null,path.basename(file.originalname,ext)+Date.now()+ext)
    }
  }),
  limits:{fileSize:5*1024*1024} //파일 크기 제한
})

app.post("/img", upload.single('img'),(req, res) => {
  // 해당 라우터가 정상적으로 작동하면 images/uploads 에 이미지가 업로드 된다
  // 업로드된 이미지의 URL 경로를 프론트엔드로 반환한다
  // 파일이 저장된 경로를 클라이언트에게 반환해준다.
  const IMG_URL= `http://localhost:8080/uploads/${req.file.filename}`
  console.log(IMG_URL)
  res.json({url:IMG_URL})
});

app.listen(8080, () => {
  console.log(`Server started...`);
});
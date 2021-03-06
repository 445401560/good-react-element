import React from 'react';
import global from '../global';
import { Upload,Message } from 'element-react';
export default class Upload2 extends React.Component {
	constructor(props) {
	  super(props);

	  this.state = {
	    imageUrl: '',
	  };
	}

	handleAvatarScucess(res, file) {
		console.log(file)
	  this.setState({ imageUrl: URL.createObjectURL(file.raw) });
	  this.props.data.updateImage(file.response);
	}

	beforeAvatarUpload(file) {
	  const isJPG = file.type === 'image/jpeg';
	  const isLt2M = file.size / 1024 / 1024 < 2;

	  if (!isJPG) {
	    Message('上传头像图片只能是 JPG 格式!');
	  }
	  if (!isLt2M) {
	    Message('上传头像图片大小不能超过 2MB!');
	  }
	  return isJPG && isLt2M;
	}


	render() {
		let imageUrl='';
		if(this.state.imageUrl==''){
			if(this.props.data.state.form.image!=undefined&&this.props.data.state.form.image!=''){
				imageUrl =`${global.apiUpdata}/images/${this.props.data.state.fileType}/${this.props.data.state.form.image}`
			}else{
				imageUrl =`http://www.good1230.com/dist2/static/images/tianmao.jpg`
			}
		}else{
			imageUrl= this.state.imageUrl;
		}
		
		let fileupload=`${global.apiUpdata}/fileupload.php?type=${this.props.data.state.imgType}`;
	  return (
	    <Upload
	      className="avatar-uploader"
	      action={ fileupload }
	      showFileList={false}
	      onSuccess={(res, file) => this.handleAvatarScucess(res, file)}
	      beforeUpload={file => this.beforeAvatarUpload(file)}
	    >
	      { imageUrl ? <img src={imageUrl} className="avatar" /> : <i className="el-icon-plus avatar-uploader-icon"></i> }
	    </Upload>
	  )
	}
}
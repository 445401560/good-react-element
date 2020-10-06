import React from 'react';
export default class Search extends React.Component {
  render() {

    return (
    	<div className="width-max padding-bottom-60 color-999  font-size-12" style={{paddingLeft:220,paddingRight:20}}>
    		<div className="border-bottom-1 border-ddd padding-bottom-10">
    			<span>相关平台：</span>
    			<span><a className=" color-999 none-line" href="http://www.good1230.com/good_vue2/#/index" target="_blank">good-vue2</a></span>
    			<span className="padding-left-10 padding-right-10 color-ccc">|</span>
    			<span><a className=" color-999 none-line" href="http://www.good1230.com/react/" target="_blank">good-react</a></span>
    			<span className="padding-left-10 padding-right-10 color-ccc">|</span>
                <span><a className=" color-999 none-line" href="http://www.good1230.com/" target="_blank">关于good1230.com个人博客网站</a></span>
                <span className="padding-left-10 padding-right-10 color-ccc">|</span>
                <span><a className=" color-999" href="https://github.com/huanglongjiang/good-react-element" target="_blank">github</a></span>
    		</div>
    		<div className=" margin-top-10">
	    		Copyright © 2018-2020 Good1230.com. All Rights Reserved.
	    	</div>
    	</div>

    );
  }
}
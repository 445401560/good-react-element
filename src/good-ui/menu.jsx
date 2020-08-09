import React from 'react';
import GoodInfo from '../good-ui/good-info.jsx';
export default class Menu extends React.Component {
	/*constructor(props) {
	    super(props);
	}*/

  render() {
  	const data=[
	  	{
	  		title:'统计',
	  		icon:'fa fa-tachometer',
	  		children:[
		  		{title:'登录日志',url:'log'},
	  		]
	  	},
	  	{
	  		title:'管理',
	  		icon:'fa fa-folder-open',
	  		children:[
		  		{title:'栏目中心',url:'root'},
		  		{title:'标签中心',url:'tag'},
		  		{title:'关键词库',url:'keywords'},
		  		{title:'文章中心',url:'article'},
		  		{title:'用户管理',url:'user'},
		  		{title:'友情链接',url:'link'},
		  		{title:'广告管理',url:'adsense'},
		  		{title:'图片轮播',url:'slider'},
	  		]
	  	},
	  	{
	  		title:'功能',
	  		icon:'fa fa-windows',
	  		children:[
		  		{title:'留言板',url:'bbs'},
		  		{title:'客服信息',url:'help'},
		  		{title:'站长统计',url:'cnzz'},
		  		// {title:'页面静态化',url:'html'},
	  		]
	  	},
	  	{
	  		title:'设置',
	  		icon:'fa fa-cogs',
	  		children:[
		  		{title:'首页SEO',url:'index'},
		  		{title:'版权信息',url:'copyright'},
		  		{title:'常规选项',url:'system'},
		  		// {title:'用户管理权限'},
	  		]
	  	},
	]

	function Children(props){
		const element2=props.children.map((item,index)=>{
			return (
			<li className="line-height-36 padding-left-30 color-999" key={index}><a className=" color-999 font-size-14 none-line margin-right-10" href={item.url}>{item.title}</a>
				{
					item.url=='bbs'?<GoodInfo data="123"></GoodInfo>:
					item.url=='log'?<GoodInfo data="7516"></GoodInfo>:null
				}
			</li>
			)
		})
		
		return (
			<ul>{element2}</ul>
		)
	}

	const element=data.map((item,index)=>{
		return (
			<ul key={index} className="border-bottom-1 border-eee">
				<li className="line-height-36">
					<i className={`padding-right-13 color-999 ${ item.icon}`}></i>
					<span className='bold color-999'>{item.title}</span>
				</li>
				<Children children={item.children}></Children>
			</ul>
		)
	})

    return (
      <div className="width-200 color-333 padding-10 align-left position-a left-0 top-60 padding-left-30">{element}</div>
    );
  }
}
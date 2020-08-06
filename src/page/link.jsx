import React from 'react';
import { Dialog,Button,Input,Radio,DateRangePicker,Tag,Switch } from 'element-react';
import GoodPagination from '../good-ui/good-pagination.jsx';
import Pagination2 from './pagination.jsx';
import GoodBreadbar from '../good-ui/good-breadbar.jsx';
import GoodTotal from '../good-ui/good-total.jsx';
import GoodTag from '../good-ui/good-tag.jsx';
import GoodSearch from '../good-ui/good-search.jsx';
import GoodTds       from '../good-ui/good-tds.jsx';
import axios from 'axios';
import GoodSwitch     from '../good-ui/good-switch.jsx';
import GoodButton from '../good-ui/good-button.jsx';
export default class Log extends React.Component {
constructor(props) {
    super(props);
    this.state = {
      dialogVisible: false,
      disabled:false,
      isEdit:false,
      google:'t-10002',
      list: [],
      value1:null, 
      value2:null, 
      searchName:'',
      form:{
        id:'',
        name:'',
        email:'',
        link:'',
        price:'',
        text:'',
        starttime:'2021-01-09',
        endtime:'2025-01-23',
        status:1,
        type:0,
      },
      page: {
          currentPage: 0,
          pageSize: 10,
      },
      type: "",
      status: "",
    };
  }
  componentDidMount() {
    this.loadList()
  }
  // 数据初始化
  loadList=()=>{
    const data={
      google: this.state.google,
      operating: "lists",
      name: this.state.searchName,
      starttime: '',
      endtime: '',
      type: this.state.type,
      status: this.state.status,
      page: this.state.page.currentPage,
      pagesize: this.state.page.pageSize,
    }
    if(this.state.value2!=null){
      data.starttime=this.state.value2[0];
      data.endtime=this.state.value2[1];
    }
    axios.post('good/google.php',data)
      .then((res) => {
         this.setState({
           list:res.data,
         });
      })
  }

  getDatas(value,index){
    const data={};
          data[index]=value;
    this.setState(data,()=> {
      this.loadList();
    })
  }
  getPage=(data)=>{
    console.log(data)
      this.setState({
          page:{currentPage: data, pageSize: 10  }
      },()=> {
        this.loadList();
      });
      
  }

  openDialog=(data)=>{
    this.setState({
        dialogVisible: true,
        disabled: false,
        isEdit: false,
        form:{
          id:'',
          name:'',
          email:'',
          link:'',
          price:'',
          text:'',
          starttime:'2021-01-09',
          endtime:'2025-01-23',
          status:1,
          type:0,
        },
      })
  }

  openDialog2=(item)=>{
    const data={
      google: this.state.google,
      operating: "select",
      id: item.id,
      status:item.status,
    }
    this.setState({dialogVisible: true,disabled: true,isEdit: true},()=> {

      axios.post('good/google.php',data)
      .then((res) => {
         this.setState({
           form:res.data.data,
         });
      })
    })
  }
  
  upData=(item)=>{
        const data={
          google: this.state.google,
          operating: item,
          form:this.state.form,
        }
        axios.post('good/google.php',data).then((res) => {
          if(res.data.retType==='success'){
            this.loadList();
            this.setState({dialogVisible: false})
          }
        })
  }
  onChange=(item,value)=>{
    const data={};
          data[item]=value;
    let newForm=Object.assign(this.state.form,data);

    this.setState({
        form:newForm,
      });
  }
  remove=(item,value)=>{
    const data={
        google: this.state.google,
        operating: 'delete',
        id:item.id,
      }
    axios.post('good/google.php',data).then((res) => {
       this.loadList();
    })
  }

  // 状态改变方法
  getStatus=(item)=>{

      const data={
          google: this.state.google,
          operating: 'status',
          id:item.id,
          status:item.status,
        }
      axios.post('good/google.php',data).then((res) => {
         this.loadList();
      })
      
  }

  //标签方法
  getTag(value,index){
    const data={};
          data[index]=value;
    this.setState(data,()=> {
      this.loadList();
    })
  }

  // 分页方法
  getPage=(data)=>{
    console.log(data)
      this.setState({
          page:{currentPage: data, pageSize: 10  }
      },()=> {
        this.loadList();
      });
      
  }
  render() {
    function Tbody(props){
      const { data }=props;
      let dataTable=data && data.map((item,index)=>{
        let status=item.status==0?false:true;
        return (
          <tr key={index} style={{background: item.status==0 ? "#f5f7fa" : "#fff"}}>
            <td>{ item.name }</td>
            <td>{ item.link }</td>
            <td>{ item.email }</td>
            <td>{ item.price }元/月×6</td>
            <td>{ item.starttime }</td>
            <td>{ item.endtime }</td>
            <td>{
              item.type==0?<Tag type="primary">友情链接</Tag>:
              item.type==1?<Tag type="success">友情链接2</Tag>:
              item.type==2?<Tag type="warning">全站链接</Tag>:
              item.type==3?<Tag type="warning">合作伙伴</Tag>:
              <Tag type="danger">服务结束</Tag>
            }
              
            </td>
            <td>
              <GoodSwitch item={item}  status={props.datas.getStatus.bind(this)}></GoodSwitch>
            </td>
            <td>
              <span className="a-link pointer margin-right-10" onClick={props.datas.openDialog2.bind(this,item)}>编辑</span>
              <span className="a-link pointer" onClick={props.datas.remove.bind(this,item)}>删除</span>
            </td>
          </tr>
        )
      })
      return <tbody>{dataTable}</tbody>
    }
    
    

    const typeList={title:'服务类型',type:'type',list:['友情链接','友情链接2','全站链接','合作伙伴','服务结束']};
    const statusList={title:'服务类型',type:'status',list:['关闭','开启']};


    const { data }=this.state.list;
    const { total }=this.state.list;
    const {value1, value2} = this.state;

    return (
      <div>
        <GoodBreadbar title="友情链接"></GoodBreadbar>
        <div className="background-white padding-10" style={{'boxShadow':' rgba(0, 0, 0, 0.25) 0px 0px 1px'}}>
          <GoodTag data={ typeList }  type={this.getTag.bind(this)}></GoodTag>
          <GoodTag data={ statusList }  type={this.getTag.bind(this)}></GoodTag>
        </div>
        <div className="padding-top-10 padding-bottom-10 clearfix">
            <div className="float-left margin-right-10">
              <Input placeholder="请输入内容" icon="search"  onChange={ (item) => this.setState({ searchName: item }) } />
            </div>
            <div className="float-left">
            <span>时间：</span>
            <DateRangePicker
            value={value2}
            placeholder="选择日期范围"
            onChange={date=>{
              console.debug('DateRangePicker1 changed: ', date)
              this.setState({value2: date})
            }}
            />
            </div>
            <Button className="float-left margin-left-20" type="primary" onClick={ this.loadList }>搜索</Button>
          <Button className="float-right margin-left-20" type="primary" icon="plus" onClick={ this.openDialog }>新增友情链接</Button>
          <GoodTotal total={ total }></GoodTotal>
        </div>
        <div className="table-data padding-20 background-white" style={{'box-shadow':'rgba(0, 0, 0, 0.25) 0px 0px 1px'}}>
          <table className="table-group">
            <thead className="block-header">
              <tr>
                <th>网站名称</th>
                <th>网址</th>
                <th>用户邮箱</th>
                <th>链接价格</th>
                <th>开始时间</th>
                <th>结束时间</th>
                <th>类型</th>
                <th>服务状态</th>
                <th>操作</th>
              </tr>
            </thead>
              <Tbody data={data} datas={this} />
          </table> 
        </div>

        {/*分页*/}
        <GoodPagination data={total}  currentPage={this.getPage.bind(this)}></GoodPagination>
        <Dialog
          className="width-600" style={{width:800}}
          title="新增友情链接"
          size="tiny"
          visible={ this.state.dialogVisible }
          onCancel={ () => this.setState({ dialogVisible: false }) }
          lockScroll={ false }
          >
            <Dialog.Body>
              <div className="table-default">
                <table className="width-max">
                  <tr>
                    <GoodTds title='网站名称'></GoodTds>
                    <td><Input placeholder="请输入内容" value={ this.state.form.name }  onChange={this.onChange.bind(this,'name')} /></td>
                  </tr>
                  <tr>
                    <GoodTds title='网站地址'></GoodTds>
                    <td><Input placeholder="请输入内容" value={ this.state.form.link }  onChange={this.onChange.bind(this,'link')} /></td>
                  </tr>
                  <tr>
                    <GoodTds title='用户邮箱'></GoodTds>
                    <td><Input placeholder="请输入内容" value={ this.state.form.email }  onChange={this.onChange.bind(this,'email')} /></td>
                  </tr>
                  <tr>
                    <GoodTds title='服务类型'></GoodTds>
                    <td>
                      <div>
                        <Radio value="0" checked={this.state.form.type == 0} onChange={this.onChange.bind(this,'type')}>友情链接</Radio>
                        <Radio value="1" checked={this.state.form.type == 1} onChange={this.onChange.bind(this,'type')}>友情链接2</Radio>
                        <Radio value="2" checked={this.state.form.type == 2} onChange={this.onChange.bind(this,'type')}>全站链接</Radio>
                        <Radio value="3" checked={this.state.form.type == 3} onChange={this.onChange.bind(this,'type')}>合作伙伴</Radio>
                        <Radio value="4" checked={this.state.form.type == 4} onChange={this.onChange.bind(this,'type')}>服务结束</Radio>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <GoodTds title='用户类型'></GoodTds>
                    <td>
                      <div>
                        <Radio value="0" checked={this.state.form.status == 0} onChange={this.onChange.bind(this,'status')}>关闭</Radio>
                        <Radio value="1" checked={this.state.form.status == 1} onChange={this.onChange.bind(this,'status')}>开启</Radio>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <GoodTds title='服务时间'></GoodTds>
                    <td>
                      <div>
                        <DateRangePicker
                          value={value1}
                          placeholder="选择日期范围"
                          onChange={date=>{
                            this.setState({value1: date})
                            console.log(date)
                          }}
                          />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <GoodTds title='价格'></GoodTds>
                    <td><Input placeholder="请输入内容" value={ this.state.form.price }  onChange={this.onChange.bind(this,'price')} /></td>
                  </tr>
                  <tr>
                    <GoodTds title='备注'></GoodTds>
                    <td><Input className="width-max" type="textarea" rows={6} placeholder="请输入内容" value={ this.state.form.text }  onChange={this.onChange.bind(this,'text')} /></td>
                  </tr>
                </table> 
              </div>
            </Dialog.Body>
            <Dialog.Footer className="dialog-footer">
              <Button onClick={ () => this.setState({ dialogVisible: false }) }>取消</Button>
              {
                this.state.isEdit?
                <Button type="primary" onClick={ this.upData.bind(this,'update') }>确定-编辑</Button>:
                <Button type="primary" onClick={ this.upData.bind(this,'insert') }>确定-新增</Button>
              }
            </Dialog.Footer>
          </Dialog>
      </div>
      
    );
  }
}
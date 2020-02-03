/**
 * 服务器消息对应的命令
 **/
interface ICommand {
    //执行方法
    execute(dataObj:any);
}

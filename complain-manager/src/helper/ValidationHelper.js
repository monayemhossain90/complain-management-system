import {message, notification} from "antd";

class ValidationHelper {

    SuccessToast(content){
        message.success(content);
    }

    ErrorToast(content){
        message.error(content);
    }

    ShowNotification(title,content){
        notification.info({
            message:title,
            placement:"bottomRight",
            description:content
        })
    }
    WarningToast(content){
        message.warning(content);
    }

    LoadingToast(content){
        message.loading(content);
    }

}


export const {SuccessToast, ErrorToast, ShowNotification, WarningToast, LoadingToast} = new ValidationHelper();
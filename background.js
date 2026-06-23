chrome.runtime.onInstalled.addListener(function(){
    chrome.contextMenus.create({
        id:"sn",
        title:"push to studKit",
        contexts:["selection"]
    });
});
chrome.contextMenus.onClicked.addListener(function(info,tab){
    if(info.menuItemId==="sn"){
        const nn={
            id:Date.now(),
            text:info.selectionText
        };
        chrome.storage.local.get(["notes"],function(result){
            const n=result.notes || [];
            n.push(nn);
            chrome.storage.local.set({notes:n});
        });
    }
});
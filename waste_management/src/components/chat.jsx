import React, { useEffect } from 'react';

const Chat = () => {
    useEffect(() => {
        (function(d, m){
            var kommunicateSettings = {
                "appId": "1c9ccecfd0b67563e20ff89cfca9bfb4e",
                "popupWidget": true,
                "automaticChatOpenOnNavigation": true
            };
            var s = document.createElement("script");
            s.type = "text/javascript";
            s.async = true;
            s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
            var h = document.getElementsByTagName("head")[0];
            h.appendChild(s);
            window.kommunicate = m;
            m._globals = kommunicateSettings;
        })(document, window.kommunicate || {});
    }, []);

    return (
        <div>
            {/* Chat component */}
        </div>
    );
};

export default Chat;

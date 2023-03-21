import React from "react";
import Head from "next/head";

const YotpoScript = () => {
    return (
      <Head>
          <script type="text/javascript">
              {(function e(){var e=document.createElement("script");e.type="text/javascript",e.async=true,e.src=`//staticw2.yotpo.com/${process.env.NEXT_PUBLIC_YOTPO_APP_KEY}/widget.js`;var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t)})()}
          </script>
      </Head>
    );
};

export default YotpoScript;
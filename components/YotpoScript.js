import React from "react";
import Head from "next/head";

const YotpoScript = () => {
    return (
      <Head>
          {/*<script type="text/javascript">
              {(function e(){var e=document.createElement("script");e.type="text/javascript",e.async=true,e.src=`//staticw2.yotpo.com/${process.env.NEXT_PUBLIC_YOTPO_APP_KEY}/widget.js`;var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t)})()}
          </script>*/}
          <script src="https://cdn-widgetsrepository.yotpo.com/v1/loader/HjVX4KxGJUfC1Rev0zqGtgB9n3rjOBPgB7rPnE4a?languageCode=en" async></script>
      </Head>
    );
};

export default YotpoScript;
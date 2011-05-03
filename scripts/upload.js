// Javascript
jQuery('#ddAddBackground').live('click', function(){
   tb_show('','media-upload.php?type=image&TB_iframe=true');
return false; 




});


jQuery('.ps-custom-media').live('click', function(){
            var $this = jQuery(this),
                vSrc = $this.attr('rel'),
                id = $this.attr('data-id');
            //lanken = lanken.replace(root,"");
            console.log('clicked'); 
           // if(!window.parent.document.getElementById('bild_input')) return false;
            window.parent.document.getElementById('dd_background').value = vSrc; 
            window.parent.document.getElementById('bild_img').src = vSrc;
            self.parent.tb_remove();
            return false;
    });

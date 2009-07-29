// This file contains javascript that is specific to the garden/profile controller.
jQuery(document).ready(function($) {
   
   $('textarea.TextBox').autogrow();
   
   $('a.AddMessage, a.EditMessage').popup({
      onUnload: function(settings) {
         var webRoot = $('#Definitions #WebRoot').text();
         $('#Content').load(webRoot + '/garden/messages?DeliveryType=VIEW');
      }   
   });
   
   // Confirm deletes before performing them
   $('a.DeleteMessage').popup({
      confirm: true,
      followConfirm: false,
      afterConfirm: function(json, sender) {
         $(sender).parents('tr').remove();
      }
   });

});
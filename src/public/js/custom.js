$(document).ready(function() {
	$('#logOut').click(function(){
		Swal.fire({
		  title: 'Are you sure?',
		  text: "Do you want to sign out?",
		  icon: 'warning',
		  showCancelButton: true,
		  confirmButtonColor: '#3085d6',
		  cancelButtonColor: '#d33',
		  confirmButtonText: 'Yes'
		}).then((result) => {
		  if (result.value) {
		  	$.ajax({
			  method: "POST",
			  url: "/user/logOut"
			}).done(function(msg) {
				if (msg === '1')
				{
					location.reload(true);
				}
			});
		  }
		});
	});
});
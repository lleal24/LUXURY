var fivepaq = {
	Login: function (email, password, rememberMe, LoginOk, LoginFail) {
		sessionStorage.removeItem('appData')

		var dataIn = new Object();
		dataIn.T = '';
		dataIn.U = '';
		dataIn.C = '';
		dataIn.L = false;
		dataIn.E = email;
		dataIn.N = '';
		dataIn.Tel = telefono;
		dataIn.Con = ''; /* cambioll */

		var datos = {
			Email: email,
			Password: password,
			RememberMe: rememberMe
		};

		var ajaxObj = {
			type: 'POST',
			url: "https://fpaq.azurewebsites.net/api/auth",
			contentType: 'application/json; charset=utf-8',
			data: JSON.stringify(datos)
		};

		$.ajax(ajaxObj)
			.done(function (result) {

				console.log(result);
				if (result.token != '') {
					dataIn.T = result.token;
					debugger;
					dataIn.U = '';
					dataIn.C = '';
					dataIn.L = true;
					dataIn.E = email;
					dataIn.Tel = telefono;
					dataIn.Con = ''; /* cambio */
					fivepaq.cargarDataUser(dataIn, LoginOk, LoginFail);
				}
			})
			.fail(function (jqXHR, textStatus) {
				console.log(jqXHR);
				console.log(textStatus);
				LoginFail();
			})
	},

	cargarDataUser: function (dataIn, LoginOk, LoginFail) {
		var infUrl = "https://fpaq.azurewebsites.net/api/auth/userinfo/" + dataIn.E;

		var ajaxObj = {
			type: 'GET',
			url: infUrl,
			contentType: 'application/json; charset=utf-8',
			headers: {
				'Authorization': 'Bearer ' + dataIn.T
			}
		};

		var request = $.ajax(ajaxObj);

		request.fail(function (jqXHR, textStatus) {

			console.log(jqXHR);
			dataIn.T = '';
			dataIn.L = false;
			sessionStorage.setItem('appData', JSON.stringify(dataIn));
			LoginFail();
		});

		request.done(function (result) {

			if (result.ClienteId > 0) {
				debugger;
				dataIn.U = result.Nombre;
				dataIn.C = result.ClienteId;
				dataIn.N = result.Cuenta;
				dataIn.Tel = result.Telefono;
				dataIn.L = true;
				dataIn.Con = result.ConvenioId; /* cambioll */
				sessionStorage.setItem('appData', JSON.stringify(dataIn));
				LoginOk();
			}
			else {

				dataIn.T = '';
				dataIn.L = false;
				sessionStorage.setItem('appData', JSON.stringify(dataIn));
				LoginFail();
			}
		});
	},

	dataOut: function () {
		var obj = JSON.parse(sessionStorage.getItem('appData'));
		return obj;
	},

	logOut: function () {
		sessionStorage.removeItem('appData');
		window.location.href = "https://fivepaq.com/";
	},

	cargarCarriers: function (CarriersOk, CarriersFail) {
		var infUrl = "https://fpaq.azurewebsites.net/api/carriers";
		var dataIn = fivepaq.dataOut();

		var ajaxObj = {
			type: 'GET',
			url: infUrl,
			contentType: 'application/json; charset=utf-8',
			headers: {
				'Authorization': 'Bearer ' + dataIn.T
			}
		};

		var request = $.ajax(ajaxObj);

		request.fail(function (jqXHR, textStatus) {
			CarriersFail();
		});

		request.done(function (result) {
			CarriersOk(result);
		});
	},

	cargarDireccionesCliente: function () {
		var dataIn = fivepaq.dataOut();
		debugger;
		var infUrl = "https://fpaq.azurewebsites.net/api/locations/" + dataIn.C;

		var ajaxObj = {
			type: 'GET',
			url: infUrl,
			contentType: 'application/json; charset=utf-8',
			headers: {
				'Authorization': 'Bearer ' + dataIn.T
			}
		};

		var request = $.ajax(ajaxObj);

		request.done(function (result) {
			DireccionesOk(result);
		});
		request.fail(function (jqXHR, textStatus) {
			/* console.log(jqXHR); */
			// DireccionesFail();
		});
	},
	CuentaAdd: function (ConvenioCta, Documento, Empresa, Nombre, Direccion, CiudadId, CodigoPostal, Telefono, Password, EMail, Asesor, Ticket) {
		Cuenta = new Object();

		if (ConvenioCta == 19) {
			Cuenta.Convenio = "BL";
			Cuenta.LlaveConvenio = "5d8a2833-3d5f-4e52-a73b-e60a69a851e5";
			Cuenta.Documento = Documento
			Cuenta.Empresa = Empresa
			Cuenta.Nombre = Nombre
			Cuenta.Direccion = Direccion
			Cuenta.CiudadId = CiudadId
			Cuenta.CodigoPostal = CodigoPostal
			Cuenta.Telefono = Telefono
			Cuenta.Password = Password
			Cuenta.EMail = EMail
			Cuenta.Asesor = Asesor
			Cuenta.TicketId = Ticket
		} else
			if (ConvenioCta == 20) {
				Cuenta.Convenio = "PL";
				Cuenta.LlaveConvenio = "874e3125-d9bf-436a-9dd2-c73f03ba256a";
				Cuenta.Documento = Documento
				Cuenta.Empresa = Empresa
				Cuenta.Nombre = Nombre
				Cuenta.Direccion = Direccion
				Cuenta.CiudadId = CiudadId
				Cuenta.CodigoPostal = CodigoPostal
				Cuenta.Telefono = Telefono
				Cuenta.Password = Password
				Cuenta.EMail = EMail
				Cuenta.Asesor = Asesor
				Cuenta.TicketId = Ticket
			}
			else
				if (ConvenioCta == 21) {
					Cuenta.Convenio = "TL";
					Cuenta.LlaveConvenio = "cba5577a-f235-4b89-8988-1a384cdb931e";
					Cuenta.Documento = Documento
					Cuenta.Empresa = Empresa
					Cuenta.Nombre = Nombre
					Cuenta.Direccion = Direccion;
					Cuenta.CiudadId = CiudadId;
					Cuenta.CodigoPostal = CodigoPostal
					Cuenta.Telefono = Telefono
					Cuenta.Password = Password
					Cuenta.Email = EMail
					Cuenta.Asesor = Asesor
					Cuenta.TicketId = Ticket
				}

		$.ajax({
			url: "https://fpaq.azurewebsites.net/api/cuentas",
			type: 'POST',
			contentType: "application/json;charset=utf-8",
			data: JSON.stringify(Cuenta),
			success: function (noCuenta) {
				CuentaSuccess(noCuenta);
				console.log(noCuenta)
			},
			error: function (request, message, error) {
				handleException(request, message, error);
			}
		});
	},
	CargarCiudades: function () {

		var ajaxObj = {
			type: 'GET',
			url: "https://fpaq.azurewebsites.net/api/Ciudades/",
			contentType: 'application/json; charset=utf-8'
		};

		var request = $.ajax(ajaxObj);
		request.done(function (result) {
			localStorage.setItem("ciudades", JSON.stringify(result));
		});

		request.fail(function (jqXHR, textStatus) {
			console.log(jqXHR);
			console.log(textStatus);
		});
	}
	,
	getCiudades: function (request, response) {
		if (request != null) {
			var data = JSON.parse(localStorage.getItem('ciudades'));

			var array = data.error ? [] : $.map(data, function (m) {
				if (m.Nombre.toUpperCase().includes(request.term.toUpperCase())) {
					return {
						label: m.Nombre,
						value: m.CiudadId,
						type: m.TipoCiudadId
					};
				}
			});
			response(array);
		}
	},

	getUrlVariables: function () {
		var vars = {};
		var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
			vars[key] = value;
		});
		return vars;
	},
	changePass: function (OldPassword, NewPassword) {
		debugger
		Datos = new Object();
		var code = JSON.parse(sessionStorage.getItem('appData'));
		Datos.Email = code.E;
		Datos.OldPassword = OldPassword;
		Datos.NewPassword = NewPassword;

		var ajaxObj = {
			url: "https://fpaq.azurewebsites.net/api/Cuentas/ChangePassword",
			type: 'POST',
			contentType: "application/json;charset=utf-8",
			data: JSON.stringify(Datos)
		}
		$.ajax(ajaxObj)
			.done(function (result) {
				console.log("cambioPass");
				console.log(result);
				sessionStorage.removeItem("appData");
				debugger;
				Swal.fire({
					title: '¡Se  ha cambiado tu contraseña.!',
					text: "Por favor inicia sesión nuevamente",
					type: 'success',
					confirmButtonText: 'Ok',
					allowOutsideClick: false,
				}).then((result) => {
					location.href = "http://luxury.fivepaq.com/"
					/* location.href = "../index.html" */
					/* 	if (result.value) {
							debugger;
							location.href = "../index.html";
						} */
				})

			})
			.fail(function (jqXHR, textStatus) {
				console.log("sadRequest");
				console.log(jqXHR);
				console.log(textStatus);
				Swal.fire({
					title: '¡Algo paso!',
					text: "Revisa tu contraseña actual",
					type: 'error',
					confirmButtonText: 'Ok',
				})

			})

	},
	forgotPass: function (Email) {
		Datos = new Object();
		Datos.Email = Email;
		var ajaxObj = {
			url: "https://fpaq.azurewebsites.net/api/cuentas/forgotpassword",
			type: 'POST',
			contentType: "application/json;charset=utf-8",
			data: JSON.stringify(Datos)
		}
		$.ajax(ajaxObj)
			.done(function (result) {
				console.log("Envio mail");
				Swal.fire({
					title: '¡Te Enviamos un Email!',
					text: "Te hemos enviado un correo electrónico con instrucciones para volver a establecer tu contraseña.",
					type: 'success',
					confirmButtonText: 'Ok',
					allowOutsideClick: false,
				}).then((result) => {
					if (result.value) {
						debugger;
						location.href = "../index.html";
					}
				})
			})
			.fail(function (jqXHR, textStatus) {
				console.log("sadRequest");
				console.log(jqXHR);
				console.log("sadRequest");
				console.log(textStatus);
				swal.fire({
					title: '¡Algo paso!',
					text: 'por favor comunique con nosotros al Email: soporte@fivepaq.com',
					type: 'error',
					confirmButtonText: 'Ok',
					allowOutsideClick: false,
				}).then((result) => {
					if (result.value) {
						debugger;
						location.href = "index.html";
					}
				})
			})
	},
	saveNewPass: function (Password, Code, Email, ConfirmPassword) {
		Datos = new Object();
		Datos.Email = Email;
		Datos.Password = Password;
		Datos.ConfirmPassword = ConfirmPassword;
		Datos.Code = Code;
		var ajaxObj = {
			url: "https://fpaq.azurewebsites.net/api/cuentas/resetpassword",
			// url: "http://localhost:44347/api/Cuentas/ResetPassword",
			type: 'POST',
			contentType: "application/json;charset=utf-8",
			data: JSON.stringify(Datos)
		}
		$.ajax(ajaxObj)
			.done(function (result) {
				console.log("ResteoPass");
				console.log(result);
				swal.fire({
					title: '¡Se ha restablecido la contraseña!',
					text: "Inicia sesión nuevamente",
					type: 'success',
					confirmButtonText: 'Ok',
					allowOutsideClick: false,
				}).then((result) => {
					if (result.value) {
						location.href = "../index.html";
					}
				})
			})
			.fail(function (jqXHR, textStatus) {

				console.log("sadRequest");
				console.log(jqXHR);
				console.log(textStatus);
				swal.fire({
					title: '¡Algo paso!',
					text: "por favor comunique con nosotros al Email: soporte@fivepaq.com",
					type: 'error',
					confirmButtonText: 'Ok',
					allowOutsideClick: false,
				}).then((result) => {
					if (result.value) {
						location.href = "../index.html";
					}
				})
			})

	},
	prealertaImage: function (clientID,
		trackingNumber, idCarrier, idLocation, TariffCode, description) {
		debugger;
		var dataIn = fivepaq.dataOut();
		let formData = new FormData();
		formData.append('clientID', clientID);
		formData.append('trackingNumber', trackingNumber);
		let imagen = document.getElementById('ImageUrl').files[0];
		formData.append('ImageUrl', imagen);
		formData.append('idCarrier', idCarrier);
		formData.append('description', description);
		formData.append('idLocation', idLocation);
		formData.append('TariffCode', TariffCode);

		$.ajax({
			// url: "https://fpaq.azurewebsites.net/api/PreAlerts/CreatePrealertWithImageAsync",
			url: "https://fpaq.azurewebsites.net/api/PreAlerts/CreatePrealertWithImageAsync",
			type: 'POST',
			contentType: false,
			processData: false,
			data: formData,
			headers: {
				'Authorization': 'Bearer ' + dataIn.T
			},
			success: function (response) {
				AlertSuccessImage(response);
			},
			error: function (request, message, error) {
				console.log(message);
				console.log(error);
				swal.fire({
					title: '¡Algo paso!',
					text: "por favor comunique con nosotros al Email: soporte@fivepaq.com",
					type: 'error',
					confirmButtonText: 'Ok',
					allowOutsideClick: false,
				})
			}
		});
	},
	prealertaValue: function (clientID,
		trackingNumber, idCarrier, idLocation, TariffCode, description, value) {
		debugger
		var dataIn = fivepaq.dataOut();
		Alerta = new Object();
		Alerta.clientID = clientID;
		Alerta.trackingNumber = trackingNumber;
		Alerta.value = value;
		Alerta.idCarrier = idCarrier;
		Alerta.description = description;
		Alerta.idLocation = idLocation;
		Alerta.TariffCode = TariffCode;
		$.ajax({
			url: "https://fpaq.azurewebsites.net/api/PreAlerts/CreatePrealertWithValueAsync",
			// url: "https://localhost:44347/api/PreAlerts/CreatePrealertWithValueAsync",
			type: 'POST',
			contentType: "application/json;charset=utf-8",
			data: JSON.stringify(Alerta),
			contentType: 'application/json; charset=utf-8',
			headers: {
				'Authorization': 'Bearer ' + dataIn.T
			},
			success: function (response) {
				AlertSuccessValue(response);

			},
			error: function (request, message, error) {
				console.log(request);
				console.log(message);
				console.log(error);
				swal.fire({
					title: '¡Algo Sucedió!',
					text: request.responseText,
					type: 'error',
					confirmButtonText: 'Ok',
					allowOutsideClick: false,
				})
			}
		});
	},

};
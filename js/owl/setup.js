fetch("/assets/imagens.json")
	.then((responseStream) => {
		if (responseStream.status === 200) {
			return responseStream.json();
		} else {
			throw new Error("Request error");
		}
	})
	.then((data) => {
		let content = document.getElementById("destaque-carrosel");
		for (let i in data["items"]) {
			let img = data["items"][i].img;
			let alt = data["items"][i].alt;
			let gato = {
				nome: data["items"][i].nome,
				descricao: data["items"][i].descricao,
			};
			let elem = document.createElement("img");
			elem.src = img;
			elem.alt = alt;
			elem.addEventListener("click", () => {
				$("#modalSelect").modal("show");
				const nome = document.getElementById("modal-gato-nome");
				const imagem = document.getElementById("modal-gato-img");
				const descricao = document.getElementById("modal-gato-descricao");
				nome.innerHTML = gato.nome;
				imagem.src = img;
				imagem.alt = alt;
				descricao.innerText = gato.descricao;
			});
			content.appendChild(elem);
		}
	})
	.then(() => {
		$("#destaque-carrosel").owlCarousel({
			loop: true,
			margin: 10,
			nav: false,
			responsive: {
				0: {
					items: 1,
				},
				600: {
					items: 3,
				},
				1000: {
					items: 5,
				},
			},
		});
	})
	.catch((err) => {
		console.log("Erro: ", err);
	});

$(document).ready(function () {
	// Gets the video src from the data-src on each button

	var $videoSrc;
	$(".video-btn").click(function () {
		$videoSrc = $(this).data("src");
	});
	console.log($videoSrc);

	// when the modal is opened autoplay it
	$("#myModal").on("shown.bs.modal", function (e) {
		// set the video src to autoplay and not to show related video. Youtube related video is like a box of chocolates... you never know what you're gonna get
		$("#video").attr(
			"src",
			$videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0"
		);
	});

	// stop playing the youtube video when I close the modal
	$("#myModal").on("hide.bs.modal", function (e) {
		// a poor man's stop video
		$("#video").attr("src", $videoSrc);
	});
	// document ready
});

function maisInfo() {
	$("#modalSelect").modal("show");
	const nome = document.getElementById("modal-gato-nome");
	const imagem = document.getElementById("modal-gato-img");
	const descricao = document.getElementById("modal-gato-descricao");
	nome.innerHTML = "CAT CITY";
	imagem.src = "img/cat-city.jpg";
	imagem.style = "max-width: 100%; height: auto;";
	imagem.alt = "Imagem de gatos";
	descricao.innerText =
		"Os milhares de gatos de rua de Istambul são alimentados, abrigados e mimados por um público adorador. Agora os felinos estão se tornando um fenômeno da Internet. Foto: Monique Jaques para The Wall Street Journal";
}

var Transicion = (function () {

	var actual = '',
		animando = false,
		transitadaActual = false,
		transitadaSiguiente = false;

	function finTransicion(paginaqsale, paginaqentra) {
		transitadaActual = false;
		transitadaSiguiente = false;
		paginaqsale.classList.remove('paginaactual');
		paginaqsale.classList.remove('sacaCubo');
		paginaqentra.classList.remove('meteCubo');
		paginaqentra.classList.add('paginaactual');
		animando = false;
	}

	function inicia(paginainicial) {
		actual = paginainicial;
		document.getElementById(paginainicial).classList.add('paginaactual');

		/* Búsqueda de botones para cambiar de página - ¿sólo para demo? */
		document.querySelectorAll("button[data-transicion]").forEach((el) => {
			el.addEventListener('click', (ev) => {
				return anima(ev.target.getAttribute('data-transicion'));
			});
		});
	}

	function anima(destino) {
		if (animando || (actual == destino)) return false;
		animando = true;

		const origen = actual;
		actual = destino;

		var orig = document.getElementById(origen);
		var dest = document.getElementById(destino);

		var acabarEventoOrig = function () {
			orig.removeEventListener('animationend', acabarEventoOrig);
			transitadaActual = true;
			if (transitadaSiguiente) {
				finTransicion(orig, dest);
			}
		};
		var acabarEventoDest = function () {
			dest.removeEventListener('animationend', acabarEventoDest);
			transitadaSiguiente = true;
			if (transitadaActual) {
				finTransicion(orig, dest);
			}
		};

		orig.classList.add('sacaCubo');
		orig.classList.add('paginaprimerplano');
		orig.addEventListener('animationend', acabarEventoOrig);

		dest.classList.add('meteCubo')
		dest.classList.add('paginaactual');
		dest.addEventListener('animationend', acabarEventoDest);
	}

	inicia("volea");

	return {
		inicia: inicia,
		anima: anima,
	};
})();
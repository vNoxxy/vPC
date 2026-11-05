// vPC - thème "macOS" pour Nilesoft Shell
// Remplace imports\theme.nss dans le dossier de Nilesoft Shell (C:\Program Files\Nilesoft Shell).
// S'adapte tout seul au mode clair / sombre de Windows.
//
// Inspiration macOS : fond translucide flouté, coins bien arrondis, fine bordure,
// élément survolé en bleu Apple avec texte blanc, séparateurs discrets en retrait.

theme
{
	name = "modern"
	view = view.small

	background
	{
		// 3 = acrylique (flou), teinte, opacité de la teinte en %
		effect = [3, if(sys.dark, #1e1e1e, #f6f6f6), if(sys.dark, 55, 75)]
	}

	border
	{
		enabled = true
		size = 1
		color = if(sys.dark, #ffffff26, #0000001f)
		radius = 3
		padding
		{
			top = 5
			bottom = 5
		}
	}

	shadow
	{
		enabled = true
		size = 10
		opacity = if(sys.dark, 45, 22)
		offset = 4
	}

	item
	{
		radius = 1
		text
		{
			select = #ffffff
		}
		back
		{
			select = if(sys.dark, #0a84ff, #007aff)
		}
		margin
		{
			left = 5
			right = 5
		}
	}

	separator
	{
		size = 1
		color = if(sys.dark, #ffffff1f, #0000001a)
		margin
		{
			left = 10
			top = 4
			right = 10
			bottom = 4
		}
	}

	symbol
	{
		select = #ffffff
	}

	image.align = 2
}

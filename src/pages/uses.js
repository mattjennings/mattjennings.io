import { Typography, Grid } from '@material-ui/core'
import React from 'react'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import Markdown from '../components/Markdown'

const software = `
- [Visual Studio Code](https://code.visualstudio.com/) — text editor
  - Appearance
    - [Arc+ (Dark Monochrome) color theme](https://marketplace.visualstudio.com/items?itemName=ph-hawkins.arc-plus)
    - [Fira Code font](https://github.com/tonsky/FiraCode)
    - [Material Icon Theme](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme)
  - Other Extensions
    - [Auto Rename Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag)
    - [Color Highlight](https://marketplace.visualstudio.com/items?itemName=naumovs.color-highlight)
    - [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)
    - [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
    - [Svg Preview](https://marketplace.visualstudio.com/items?itemName=SimonSiefke.svg-preview)
- [Toggl](https://toggl.com/) — time tracking
- [1Password](https://1password.com/) — password manager
- [Alfred](https://www.alfredapp.com/)
`

const hardware = `
  - Mac Mini 2018
    - 3.2GHz 6‑core i7
    - 32GB RAM
    - 512GB storage
  - Acer B326HUL 32-inch Monitor
  - Edifier R1280T Powered Bookshelf Speakers
  - Apple Magic Keyboard
  - Logitech G502 Mouse
  - Staples Hyken Technical Mesh Task Chair
  - Jarvis standing desk (Ikea table top)
`

const Uses = () => {
  return (
    <Layout>
      <SEO title="Uses" />
      <Grid container justify="center" spacing={4}>
        <Grid item xs={12} md={4}>
          <Typography variant="h4" component="h2">
            Hardware
          </Typography>

          <Markdown>{hardware}</Markdown>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h4" component="h2">
            Software
          </Typography>
          <Markdown>{software}</Markdown>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default Uses

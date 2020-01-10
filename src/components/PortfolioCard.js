import React from "react"
import { Card, CardHeader, CardContent } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
  },
})
export default function PortfolioCard(props) {
  const classes = useStyles(props)
  return (
    <Card className={classes.root}>
      <CardHeader title="Tradebreaker" />
      <CardContent>asdfasf</CardContent>
    </Card>
  )
}

import React from 'react'
import { Grid, Card } from '@material-ui/core'
import Layout from '../components/layout'

const style_image = {
  height: '90%',
  width: '90%',
}

/**
 * Liste over retter i menyen
 * TODO: Get this data from database
 * @type {MenuItem[]}
 */
const menuItemsData = [
  {
    navn: 'Mat1',
    bildeUrl:
      'https://cdn.digg.com/images/0d220736ec91419682471c71dfc8a439_407c1382cbc6d6213971e53f30091ec1_1_original.jpeg',
    beskrivelse: 'Sykt digg',
    ingredienser: 'masse greier',
  },
  {
    navn: 'Mat2',
    bildeUrl:
      'https://cdn.digg.com/images/0d220736ec91419682471c71dfc8a439_407c1382cbc6d6213971e53f30091ec1_1_original.jpeg',
    beskrivelse: 'Sykt digg',
    ingredienser: 'masse greier',
  },
]

/**
 * Generate menuItem based on MenuItemData
 * @param {MenuItem} menuItem
 */
const getCafeMenuItem = menuItem => {
  return (
    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
      {menuItem.navn}
    </Grid>
  )
}
const cafeMenu = () => {
  const menuItemComponents = []
  menuItemsData.forEach(menuItemData => {
    menuItemComponents.push(getCafeMenuItem(menuItemData))
  })
  return (
    <Layout spacingTop={true}>
      <Grid container direction="column">
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <img src="https://cdn.digg.com/images/0d220736ec91419682471c71dfc8a439_407c1382cbc6d6213971e53f30091ec1_1_original.jpeg" />
          <h1>KAFEMENY</h1>
        </Grid>
        {menuItemComponents}
      </Grid>
    </Layout>
  )
}

export default cafeMenu

/**
 * @typedef MenuItem
 * @property {string} navn
 * @property {string} beskrivelse
 * @property {string} imgUrl
 * @property {string} ingredienser
 */


export const getPortfolioQuery = (portfolioId) => {
  console.error("don't run this ")
  return `query {
    getPortfolioCollection(portfolioCollectionId: "${portfolioId}") {
      dateAddedToDynamo
      dateModifiedInDynamo
      description
      featuredCollection
      highlightedCollection
      imageUri
      layout
      portfolioCollectionId
      portfolioUserId
      privacy
      title
      portfolioItems {
        items {
          annotation
          dateAddedToDynamo
          dateModifiedInDynamo
          description
          imageUri
          internalItemId
          itemType
          portfolioCollectionId
          portfolioItemId
          portfolioUserId
          sequence
          title
          uri
        }
      }
    }
  }`
}

export const savePortfolioItemQuery = (item) => {
  return `mutation {
    savePortfolioItem(
      portfolioCollectionId: "${item.portfolioCollectionId}",
      portfolioItemId: "${item.portfolioItemId}"
      imageUri: "${item.imageUri}",
      internalItemId: "${item.portfolioItemId}"
      itemType: internal,
      sequence: ${item.sequence},
      title: "${emptyString(item.title)}",
      annotation: "${emptyString(item.annotation)}",
      description: "${emptyString(item.description)}",
    ) {
      portfolioItemId
      portfolioCollectionId
      imageUri
      sequence
      title
      annotation
    }
  }
  `
}

export const savePortfolioCollectionQuery = (portfolio) => {
  return `mutation {
    savePortfolioCollection(
      portfolioCollectionId: "${portfolio.portfolioCollectionId}",
      featuredCollection: ${portfolio.featuredCollection},
      highlightedCollection: ${portfolio.highlightedCollection},
      title: "${emptyString(portfolio.title)}",
      privacy: ${portfolio.privacy},
      layout: "${portfolio.layout}",
      description: "${emptyString(portfolio.description)}",
      imageUri: "${emptyString(portfolio.imageUri)}"
    ) {
      dateAddedToDynamo
      dateModifiedInDynamo
      description
      featuredCollection
      highlightedCollection
      imageUri
      layout
      portfolioCollectionId
      portfolioUserId
      privacy
      title
      portfolioItems {
        items {
          annotation
          dateAddedToDynamo
          dateModifiedInDynamo
          description
          imageUri
          internalItemId
          itemType
          portfolioCollectionId
          portfolioItemId
          portfolioUserId
          sequence
          title
          uri
        }
      }
    }
  }`
}

const emptyString = (field) => {
  if (typeof (field) === 'undefined' || field === null) {
    return ''
  }
  return field
}

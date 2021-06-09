module.exports = (data) => {
  return data.allMarbleItem.nodes.map(node => {
    if (node.searchData) {
      if (node.searchData.date) {
        node.searchData.date = node.searchData.date.trim()
        node.searchData.date = node.searchData.date.replace(/(\[|\]|[.]$|[,]$|[/]$|[:]$|[;]$)/g, '').trim()
      }
    }
    return node.searchData
  })
}

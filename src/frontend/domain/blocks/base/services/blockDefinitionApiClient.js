export const allBlockDefinitions = async () => {
  return [
    {
      typeId: '25fe4020-6b5e-4774-b753-82a8b6f018f1',
      componentName: 'HeadlineBlock',
      title: 'Headline',
      description: 'A headline block',
      options: { icon: 'http://placeimg.com/120/120/animals' },
    },
    {
      typeId: '694b10c6-2f99-4b1d-aafd-5c54900b0cf8',
      componentName: 'TextBlock',
      title: 'Text',
      description: 'A text block',
      options: { icon: 'http://placeimg.com/120/120/animals' },
    },
    {
      typeId: '45fe4020-6b5e-4774-b753-82a8b6f018f1',
      componentName: 'LinkBlock',
      title: 'Link',
      description: 'AlLink block',
      options: { icon: 'http://placeimg.com/120/120/animals' },
    },
  ]
}

export default {
  allBlockDefinitions,
}

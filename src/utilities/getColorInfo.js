import wretch from 'wretch'
import getValue from 'get-value'

import { URLS } from '../consts/urls'
import { WHITE_COLOR_INFO } from '../consts/colors'

export const getColorInfo = async (codes) => {
  const suffix = prepareHexSuffix(codes)
  const url = URLS.getColorInfo(suffix)
  const { colors } = await wretch(url).get().json()
  return colors
}

const prepareHexSuffix = (codes) => {
  return codes.join(',').replace(/#/g, '')
}

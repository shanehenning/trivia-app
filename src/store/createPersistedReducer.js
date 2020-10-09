import createCompressor from 'redux-persist-transform-compress'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

export default (reducerKey, reducer, blacklist) => {
  const compressor = createCompressor()
  const config = {
    blacklist: blacklist || '',
    key: reducerKey,
    storage,
    transforms: [compressor],
  }
  return persistReducer(config, reducer)
}

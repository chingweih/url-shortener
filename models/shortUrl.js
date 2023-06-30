import mongoose from 'mongoose'
import shortId from 'shortid'

const shortUrlSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    full: {
      type: String,
      required: true,
    },
    short: {
      type: String,
      required: true,
      default: shortId.generate,
    },
    clicks: {
      type: Number,
      required: true,
      default: 0,
    },
    utmSource: {
      type: String,
    },
    utmMedium: {
      type: String,
    },
    utmName: {
      type: String,
    },
    redirectTo: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

const model = mongoose.model('ShortUrl', shortUrlSchema)

export const { schema } = model
export default model

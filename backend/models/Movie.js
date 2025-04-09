const mongoose = require('mongoose');

const downloadLinkSchema = new mongoose.Schema({
  quality: {
    type: String,
    enum: ['480p', '720p', '1080p', '2160p', 'Other'],
    required: true
  },
  size: {
    type: String,
    required: true
  },
  provider: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  }
});

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    index: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  description: {
    type: String,
    required: true
  },
  poster: {
    type: String,
    required: true
  },
  backdrop: String,
  releaseDate: {
    type: Date,
    required: true
  },
  duration: {
    type: Number, // in minutes
    required: true
  },
  genres: {
    type: [String],
    required: true,
    index: true
  },
  language: {
    type: String,
    required: true,
    index: true
  },
  subtitles: [String],
  rating: {
    type: Number,
    min: 0,
    max: 10,
    default: 0
  },
  tmdbId: {
    type: Number,
    index: true
  },
  imdbId: {
    type: String,
    index: true
  },
  trailerUrl: String,
  downloadLinks: [downloadLinkSchema],
  categories: {
    type: [String],
    required: true,
    index: true
  },
  isSeries: {
    type: Boolean,
    default: false
  },
  totalSeasons: {
    type: Number,
    default: 0
  },
  totalEpisodes: {
    type: Number,
    default: 0
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  isTrending: {
    type: Boolean,
    default: false
  },
  views: {
    type: Number,
    default: 0
  },
  downloads: {
    type: Number,
    default: 0
  },
  source: {
    type: String,
    enum: ['vegamovies', 'bollyflix', 'hdhub4u', 'manual', 'other'],
    required: true
  },
  sourceUrl: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the 'updatedAt' field on save
movieSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Create text index for search
movieSchema.index({ 
  title: 'text', 
  description: 'text'
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie; 
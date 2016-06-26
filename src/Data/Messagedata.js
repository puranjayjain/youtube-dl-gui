// this file stores all the error text that can occur in the app or a successful update

const Errordata = {
  // if the url is not valid (used in textfields)
  invalidUrl: 'This is not a valid url',
  // internet connection states
  noTnternet: 'You are offline',
  internet: 'You are online',
  // invalid file path
  invalidPath: 'Enter a valid path',
  // error fetching format
  errorFormat: 'Error fetching formats',
  // third party website and playlists
  thirdPartyError: 'Playlists and third party websites are currently not supported',
  // video is downloading
  videoDownloading: 'Error Video is downloading',
  // file doesnt exist error
  fileDoesntExist: 'File does not exist on disk',
  // could'nt delete youtube-dl's old exe, it is in use
  couldntDeleteYtdl: 'Unable to delete old youtubedl exe',
  // could'nt rename youtube-dl's new exe, it is in use
  couldntRenameYtdl: 'Unable to rename new youtubedl exe'
}
//
const SuccessData = {
  // update of youtube-dl done
  updateYtdl: 'Successfully updated youtube-dl exe'
}

export default {Errordata, Successdata}

// SPDX-FileCopyrightText: 2020 tech@factchecklab <tech@factchecklab.org>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

function topicMarshaler(topic) {
  const { createdAt, updatedAt, ...rest } = topic
  return {
    createdAt: new Date(createdAt),
    updatedAt: new Date(updatedAt),
    ...rest
  }
}

function reportMarshaler(report) {
  const { createdAt, updatedAt, ...rest } = report
  return {
    createdAt: new Date(createdAt),
    updatedAt: new Date(updatedAt),
    ...rest
  }
}

function socialPostDataPointMarshaler(socialPostDataPoint) {
  const { time, ...rest } = socialPostDataPoint
  return {
    time: new Date(time),
    ...rest
  }
}

function socialInteractionDataPointMarshaler(socialPostDataPoint) {
  const { time, ...rest } = socialPostDataPoint
  return {
    time: new Date(time),
    ...rest
  }
}

function socialGroupMarshaler(socialGroup) {
  const { ...rest } = socialGroup
  return {
    ...rest
  }
}

module.exports = {
  topicMarshaler,
  reportMarshaler,
  socialPostDataPointMarshaler,
  socialInteractionDataPointMarshaler,
  socialGroupMarshaler
}

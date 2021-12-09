#------------------------------------------------------------------------------
# Builder Image
#------------------------------------------------------------------------------
FROM node:12 as builder

ARG BUILD_NUMBER=BUILD_NUMBER
ARG REVISION=REVISION

# Create app directory
RUN #mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
#COPY yarn.lock /usr/src/app/
RUN npm install
#RUN yarn instal

# Build app
COPY . /usr/src/app

RUN npm run build

# Create version.json
RUN sed -e "s;%DATE%;$(date);g" -e "s;%BUILD%;${BUILD_NUMBER};g" -e "s;%REVISION%;${REVISION};g" version.template.json > build/version.json

#------------------------------------------------------------------------------
# Result Image
#------------------------------------------------------------------------------
FROM node:12

# Create app directory
WORKDIR /usr/src/app

# Copy artifacts from the builder image
COPY --from=builder /usr/src/app/build ./build
COPY --from=builder /usr/src/app/server ./server
COPY --from=builder /usr/src/app/package.json .

# Install app's run-time dependencies
RUN npm install --production

EXPOSE 9000

# defined in package.json
CMD ["npm", "run", "start:prod"]

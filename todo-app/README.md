# Classroom Coding

## Thoughts

This is a "practical" application built with react and functional techniques. React components are "impure" and our model stays pure (although there's a bit of cheating in utils as it's a hodge podge).

## How to use

In Pt1, we build a standard flickr search component. Pt2 updates it to a drag and drop collage. Pt3 persists to a postgres db using node/express.

Each branch pt1, pt2, etc is the finished version of that feature set. As such, one should start with master to build pt1, start with pt1 to build pt2 and so on.

After installing visit http://localhost:5431 to see the blank slate app. If greeted with a snowy white page, you'll know you succeeded.

## Install

First run:

```
npm install
```

Then run each of these commands in a different terminal window. One for webpack, one for babel-node:

```
npm run dev
```

```
npm run server
```


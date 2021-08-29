import shortid from "shortid";

export default function seed(store) {
  // Generate Users
  console.log("Generating Users");
  const userOne = {
    userName: "Ultron",
    userId: shortid.generate()
  }
  const userTwo = {
    userName: "Captain America",
    userId: shortid.generate()
  }
  const userThree = {
    userName: "Iron Man",
    userId: shortid.generate()
  }
  
  const userFour = {
    userName: "Nick Fury",
    userId: shortid.generate()
  }

  store.dispatch({
    type: "ADD_USER",
    payload: userOne
  });

  store.dispatch({
    type: "ADD_USER",
    payload: userTwo
  });

  store.dispatch({
    type: "ADD_USER",
    payload: userThree
  });

  store.dispatch({
    type: "ADD_USER",
    payload: userFour
  });

  
  // Generate Lists and Cards
  console.log("Insert first list");
  const firstListId = shortid.generate();

  store.dispatch({
    type: "ADD_LIST",
    payload: { listId: firstListId, listTitle: "To do" }
  });

  store.dispatch({
    type: "ADD_CARD",
    payload: {
      listId: firstListId,
      cardId: shortid.generate(),
      cardText: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. "
    }
  });

  const cardId1 = shortid.generate();
  store.dispatch({
    type: "ADD_CARD",
    payload: {
      listId: firstListId,
      cardId: cardId1,
      cardText: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    },
  });

  store.dispatch({
    type: "ASSIGN_USER",
    payload: {
      ...userOne,
      cardId: cardId1,
    },
  });

  console.log("Insert second list");
  const secondListId = shortid.generate();

  store.dispatch({
    type: "ADD_LIST",
    payload: { listId: secondListId, listTitle: "In Progress" }
  });

  const cardId2 = shortid.generate()
  store.dispatch({
    type: "ADD_CARD",
    payload: {
      listId: secondListId,
      cardId: cardId2,
      cardText: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum",
    },
  });
  store.dispatch({
    type: "ASSIGN_USER",
    payload: {
      ...userThree,
      cardId: cardId2,
    },
  });

  store.dispatch({
    type: "ADD_CARD",
    payload: {
      listId: secondListId,
      cardId: shortid.generate(),
      cardText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
    }
  });

  console.log("Insert second list");
  const ThirdListId = shortid.generate();

  store.dispatch({
    type: "ADD_LIST",
    payload: { listId: ThirdListId, listTitle: "QA" }
  });

  store.dispatch({
    type: "ADD_CARD",
    payload: {
      listId: ThirdListId,
      cardId: shortid.generate(),
      cardText: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"
    }
  });

  const cardId3 = shortid.generate();
  store.dispatch({
    type: "ADD_CARD",
    payload: {
      listId: ThirdListId,
      cardId: cardId3,
      cardText: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    },
  });

  store.dispatch({
    type: "ASSIGN_USER",
    payload: {
      ...userFour,
      cardId: cardId3,
    },
  });
};

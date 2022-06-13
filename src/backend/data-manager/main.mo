import Map "mo:base/HashMap";
import Text "mo:base/Text";
import Array "mo:base/Array";
import Principal "mo:base/Principal";
import List "mo:base/List";
import Nat "mo:base/Nat";

actor {

  /*
    TYPE DEFINITIONS
  */
  type UUID = Text;
  type Payload = Text;

  // Blocks
  type Block = {
    id: UUID;
    typeId: UUID;
    payload : Payload
  };

  // Cards
  type Card = {
    id: UUID;
    title : Text;
    meta : Payload;

    block_ids : [UUID];

    children_card_ids : [UUID];
  };

  // Stores all Blocks
  let blocks_by_id = Map.HashMap<UUID, Block>(0, Text.equal, Text.hash);

  // Store all Cards
  let cards_by_id = Map.HashMap<UUID, Card>(0, Text.equal, Text.hash);

  // Internet Identity/User
  type PrincipalName = Text;

  var admins : [Text] = ["2vxsx-fae", "2vxsx-saa"];

  // Stores all Topics for a user (i.e. Dashboard)
  private var topics_by_user = Map.HashMap<PrincipalName, [UUID]>(0, Text.equal, Text.hash);

  // Miljn Energy
  type Energy = Int;

  // Stores current energy levels for a user
  private var energy_by_user = Map.HashMap<PrincipalName, Energy>(0, Text.equal, Text.hash);


  //////////////////////////////////
  ///    WORK WITH BLOCKS        ///
  //////////////////////////////////

  /*
   * Create new block
   */
  public func block_insert(id : UUID, block : Block): async () {
    blocks_by_id.put(id, block);
  };

  /*
   * Update a block
   */
  public func block_update(id : UUID, block : Block): async () {
    blocks_by_id.put(id, block);
  };

  /*
   * Find a block by ID
   */
  public query func block_lookup(id : UUID) : async ?Block {
    blocks_by_id.get(id)
  };


  /*
   * Bulk lookup a set of blocks
   */
  public query func block_lookup_bulk(ids : [UUID]) : async [Block] {
      var list : [Block] = [];
        for(block_id : UUID in ids.vals()){
            var block = blocks_by_id.get(block_id);
                    switch(block) {
                        case (null) {};
                        case (?existingBlock) {
                            list := Array.append<Block>(list, [existingBlock]);
                        }
                    };
        };
      return list;
  };


  /*
   * Deletes a block by id
   */
  public func block_delete(id : UUID):async () {
    var _x = blocks_by_id.remove(id);
  };


  //////////////////////////////////
  ///    WORK WITH CARDS        ///
  //////////////////////////////////


  /*
   * Create new card
   */
  public func card_insert(id : UUID, card : Card): async () {
    cards_by_id.put(id, card);
  };

  /*
   * Update a card
   */
  public func card_update(id : UUID, card : Card): async () {
    cards_by_id.put(id, card);
  };

  /*
   * Find a card by id
   */
  public query func card_lookup(id : UUID) : async ?Card {
    cards_by_id.get(id)
  };


  /*
   * Deletes a card by id
   *
   * Deletes children cards recusively
   * Deletes all blocks
   */
  public func card_delete(id : UUID):async () {
    var card = cards_by_id.get(id);
    switch(card) {
      case (null) {};
      case (?existingCard) {
        for(child_id in existingCard.children_card_ids.vals()) {
          var _y = card_delete(child_id);
        };
        for(block_id in existingCard.block_ids.vals()) {
          var _z = block_delete(block_id);
        };
      }
    };
    var _x = cards_by_id.remove(id);
  };


  /*
   * Bulk lookup a set of cards
   */
  public query func card_lookup_bulk(ids : [UUID]) : async [Card] {
      var list : [Card] = [];
        for(card_id : UUID in ids.vals()){
            var card = cards_by_id.get(card_id);
                    switch(card) {
                        case (null) {};
                        case (?existingCard) {
                            list := Array.append<Card>(list, [existingCard]);
                        }
                    };
        };
      return list;
  };

  /*
   * Validate card consistency
   */
  public func card_fix_inconsistency(id : UUID) : async ?Card {
      return await card_consistency_check(id, false);
  };

  /*
   * Validate card consistency recursively
   */
  public func card_fix_inconsistency_recursively(id : UUID) : async ?Card {
      return await card_consistency_check(id, true);
  };

  /*
   * Validate card consistency
   */
  private func card_consistency_check(id : UUID, recursive : Bool) : async ?Card {
      var card = cards_by_id.get(id);

      switch(card) {
          case (null) {};
          case (?existingCard) {

            var newChildIds : [UUID] = [];

            for (child_id in existingCard.children_card_ids.vals()) {
                var child = cards_by_id.get(child_id);
                switch(child) {
                    case(null) {};
                    case(?existingChild) {
                        switch(recursive) {
                            case (false) {};
                            case (true) {
                                var child_card_check = await card_consistency_check(child_id, false);
                            };
                        };
                        newChildIds := Array.append<UUID>(newChildIds, [child_id]);
                    }
                }
            };

            var newBlockIds : [UUID] = [];

            for (block_id in existingCard.block_ids.vals()) {
                var block = blocks_by_id.get(block_id);
                switch(block) {
                    case(null) {};
                    case(?existingBlock) {
                        newBlockIds := Array.append<UUID>(newBlockIds, [block_id]);
                    }
                }
            };

            cards_by_id.put(id, {
                id = id;
                title = existingCard.title;
                meta = existingCard.meta;
                block_ids = newBlockIds;
                children_card_ids = newChildIds
            });
          }
      };



      return cards_by_id.get(id);
  };

  public query func blocks_by_card_id(id : UUID) : async [Block] {

    var cardOfUser = cards_by_id.get(id);

    var listBlocks : [Block] = [];

    switch(cardOfUser) {
        case (null) {};
        case (?existingCard) {
            var blocksOfCard = existingCard.block_ids;
            for(block_id : UUID in blocksOfCard.vals()){
                var block = blocks_by_id.get(block_id);
                    switch(block) {
                        case (null) {};
                        case (?existingBlock) {
                            listBlocks := Array.append<Block>(listBlocks, [existingBlock]);
                        }
                    };
            };
        };
    };

    return listBlocks;
  };


  //////////////////////////////////
  /// WORK WITH TOPICS/DASHBOARD ///
  //////////////////////////////////

  /*
   * Add a topic
   */
  public shared({ caller }) func addTopic(cardId : UUID): async() {
    let principalName = Principal.toText(caller);
    drain(principalName, 10);

    var topics = topics_by_user.get(principalName);

    switch(topics) {
        case (null) {
            topics_by_user.put(principalName, [
                cardId
            ]);
        };
        case (?existingTopicList) {
            var newTopicList = Array.append<UUID>(existingTopicList, [cardId]);
            topics_by_user.put(principalName, newTopicList);
        };
    };
  };

  /*
   * Get all topics/dashboard for current user
   */
  public query({ caller }) func getTopics() : async [Card] {
       var listCards : [Card] = [];


       let principalName = Principal.toText(caller);
        var topics = topics_by_user.get(principalName);

    switch(topics) {
        case (null) {};
        case (?existingTopicList) {

            for(card_id : UUID in existingTopicList.vals()){
                var card = cards_by_id.get(card_id);
                    switch(card) {
                        case (null) {};
                        case (?existingCard) {
                            listCards := Array.append<Card>(listCards, [existingCard]);
                        }
                    };
            };

        };
    };

    return listCards;
  };


  //////////////////////////////////
  ///  WORK WITH MILJN ENERGY    ///
  //////////////////////////////////

  /*
   * Overwrites current energy level
   */
  public shared({ caller }) func recharge(energy : Energy) : async () {
       var listCards : [Card] = [];

       let principalName = Principal.toText(caller);
       var topics = energy_by_user.put(principalName, energy);

  };


  /*
   * Removes/uses energy
   */
  private func drain(user: PrincipalName, energy : Energy) {

        var currentEnergy = energy_by_user.get(user);

        switch(currentEnergy) {
            case (null) {};
            case (?existingCurrentEnergy) {
                energy_by_user.put(user, existingCurrentEnergy - energy);
            };
        };

  };

  /*
   * Returns current energy level for current user
   */
  public query({ caller }) func getCurrentEnergy() : async Energy {
     var energy : Energy = 0;

    let principalName = Principal.toText(caller);

    var currentEnergy = energy_by_user.get(principalName);

        switch(currentEnergy) {
            case (null) {};
            case (?existingCurrentEnergy) {
               return existingCurrentEnergy;
            };
          };

     return energy;
  };

  public query({ caller }) func whoami() : async PrincipalName {
    return Principal.toText(caller);
  };

  /*
   * Returns true for registered admin principals
   */
  public query({ caller }) func isAdmin() : async Bool {
    var isAdmin = false;

    for(adminId : Text in admins.vals()){
      if(adminId == Principal.toText(caller)) {
        isAdmin := true;
      };
    };

    return isAdmin;
  };

  /*
   * Checks if uuid is valid for new item
   */
  public query func idIsValid(id : UUID) : async Bool {
    return blocks_by_id.get(id) == null and cards_by_id.get(id) == null;
  };

  /*
   * Deep clones topic / card tree
   */
  public shared({ caller }) func createWorkingCopy(templateID : UUID) : async UUID {
    await deepClone_card(templateID);
  };

  public shared({ caller }) func deepClone_card(from : UUID) : async UUID {


    var card = cards_by_id.get(from);
    var newChildrenIds : [UUID] = [];
    var newBlockIds : [UUID] = [];
    switch(card) {
      case (null) {};
      case (?existingCard) {
        for(child_id in existingCard.children_card_ids.vals()) {
          var cardId = await deepClone_card(child_id);
          newChildrenIds := Array.append<UUID>(newChildrenIds, [cardId]);
        };
        for(block_id in existingCard.block_ids.vals()) {
          var blockId = await deepClone_block(block_id);
          newBlockIds := Array.append<UUID>(newBlockIds, [blockId]);
        };
        var uuid : UUID = await getNextValidUUID();
        let newCard = {
          id = uuid;
          title = existingCard.title;
          meta = existingCard.meta;
          block_ids = newBlockIds;
          children_card_ids = newChildrenIds;
        };
        cards_by_id.put(uuid, newCard);

        return uuid;
      };
    };

    return "00000000-0000-0000-0000-000000000000";
  };

  public shared({ caller }) func deepClone_block(from : UUID) : async UUID {
    var uuid : UUID = await getNextValidUUID();
    var source_block = blocks_by_id.get(from);
    switch(source_block) {
      case (null) {};
      case (?existingBlock) {

        let block : Block = {
          id = uuid;
          typeId = existingBlock.typeId;
          payload = existingBlock.payload;
        };
        var _x = blocks_by_id.put(uuid, block);
      };
    };
    return uuid;
  };

  public query func getNextValidUUID() : async UUID {


    var offset : Nat = 0;

    while(true) {

      var bytes : Nat = blocks_by_id.size() + cards_by_id.size() + 100000000000 + offset;
      var end : Text = Nat.toText(bytes);
      var id = "00000000-0000-0000-0000-" # end;
      if(blocks_by_id.get(id) == null and cards_by_id.get(id) == null) {
        return id;
      };
      offset := offset + 1;
    };

    return "";
  };
};

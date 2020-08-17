var allCurrentModels = [];
var lastAddedModel;
var rotationValues = [];
var isFlipVertical = false;
var flipValues = [];

var World = {

    platformAssisstedTrackingSupported: false,
    createOverlaysCalled: false,
    canStartTrackingIntervalHandle: null,

    init: function initFn() {
        /*
            When you'd like to make use of the SMART feature, make sure to call this function and await the result
            in the AR.hardware.smart.onPlatformAssistedTrackingAvailabilityChanged callback.
         */
        AR.hardware.smart.isPlatformAssistedTrackingSupported();
    },

    createOverlays: function createOverlaysFn() {
        if (World.createOverlaysCalled) {
            return;
        }

        World.createOverlaysCalled = true;

        var crossHairsRedImage = new AR.ImageResource("assets/crosshairs_red.png", {
            onError: World.onError
        });
        this.crossHairsRedDrawable = new AR.ImageDrawable(crossHairsRedImage, 1.0);

        var crossHairsBlueImage = new AR.ImageResource("assets/crosshairs_blue.png", {
            onError: World.onError
        });
        this.crossHairsBlueDrawable = new AR.ImageDrawable(crossHairsBlueImage, 1.0);

        var crossHairsGreenImage = new AR.ImageResource("assets/crosshairs_green.png", {
            onError: World.onError
        });
        this.crossHairsGreenDrawable = new AR.ImageDrawable(crossHairsGreenImage, 1.0);

        this.tracker = new AR.InstantTracker({
            onChangedState: function onChangedStateFn(state) {
                if (state === AR.InstantTrackerState.INITIALIZING) {
                    document.getElementById("tracking-start-stop-button").src = "assets/buttons/start.png";
                    //document.getElementById("tracking-height-slider-container").style.visibility = "visible";
                } else {
                    if (World.platformAssisstedTrackingSupported) {
                        World.showUserInstructions("Running with platform assisted tracking(ARKit or ARCore).");
                    }

                    document.getElementById("tracking-start-stop-button").src = "assets/buttons/stop.png";
                    //document.getElementById("tracking-height-slider-container").style.visibility = "hidden";
                }
            },
            /*
                Device height needs to be as accurate as possible to have an accurate scale returned by the Wikitude
                SDK.
             */
            deviceHeight: 1.0,
            onError: World.onError,
            onChangeStateError: World.onError
        });

        this.instantTrackable = new AR.InstantTrackable(this.tracker, {
            drawables: {
                cam: World.crossHairsBlueDrawable,
                initialization: World.crossHairsRedDrawable
            },
            onTrackingStarted: function onTrackingStartedFn() {
                /* Do something when tracking is started (recognized). */
                console.log("onTrackingStartedFn");
            },
            onTrackingStopped: function onTrackingStoppedFn() {
                /* Do something when tracking is stopped (lost). */
                console.log("onTrackingStopped");
            },
            onTrackingPlaneClick: function onTrackingPlaneClickFn(xpos, ypos) {
                /*
                    xPos and yPos are the intersection coordinates of the click ray and the instant tracking plane.
                    They can be applied to the transform component directly.
                */
               console.log("onTrackingPlaneClick");
                if(allCurrentModels.length == 0){
                    World.addModel(xpos, ypos);
                }
                
            },
            onTrackingPlaneDragBegan: function onTrackingPlaneDragBeganFn(xPos, yPos) {
                console.log("onTrackingPlaneDragBegan",xPos,yPos);
                //World.updatePlaneDrag(xPos, yPos);
            },
            onTrackingPlaneDragChanged: function onTrackingPlaneDragChangedFn(xPos, yPos) {
                console.log("onTrackingPlaneDragChanged",xPos,yPos);
                //World.updatePlaneDrag(xPos, yPos);
            },
            onTrackingPlaneDragEnded: function onTrackingPlaneDragEndedFn(xPos, yPos) {
                console.log("onTrackingPlaneDragEnded",xPos,yPos);
                //World.updatePlaneDrag(xPos, yPos);
                World.initialDrag = false;
            },

            onError: World.onError
        });

        World.canStartTrackingIntervalHandle = setInterval(
            function() {
                if (World.tracker.canStartTracking) {
                    World.instantTrackable.drawables.initialization = [World.crossHairsGreenDrawable];
                } else {
                    World.instantTrackable.drawables.initialization = [World.crossHairsRedDrawable];
                }
            },
            1000
        );
    },
    showInfo: function showInfoFn() {
        alert("Under construction : Show instructions!")
    },
    flipModel : function flipModelFn() {
        if(allCurrentModels.length>0)
        {
            var modelIndex = allCurrentModels.length-1;
            console.log("flipModel :: isFlipVertical", isFlipVertical, flipValues[modelIndex], allCurrentModels[modelIndex].rotate.tilt, allCurrentModels[modelIndex].rotate.x);
            if(isFlipVertical){
                allCurrentModels[modelIndex].rotate.x = -90.0;
            }
            else{
                allCurrentModels[modelIndex].rotate.x = 0.0;
            }
            isFlipVertical = !isFlipVertical;
        }
        
    },

    changeTrackerState: function changeTrackerStateFn() {

        if (this.tracker.state === AR.InstantTrackerState.INITIALIZING) {
            this.tracker.state = AR.InstantTrackerState.TRACKING;
        } else {
            this.tracker.state = AR.InstantTrackerState.INITIALIZING;
        }
    },

    changeTrackingHeight: function changeTrackingHeightFn(height) {
        this.tracker.deviceHeight = parseFloat(height);
    },

    addModel: function addModelFn(xpos, ypos) {
        if (this.tracker.state === AR.InstantTrackerState.TRACKING) {
            
            var modelIndex = rotationValues.length;
            //World.addModelValues();

            var model = new AR.Model("assets/models/suitcase-nowheel.wt3", {
                scale: {
                    x: 0.010,
                    y: 0.010,
                    z: 0.010
                },
                translate: {
                    x: xpos,
                    y: ypos
                },
                rotate: {
                    /* Create with a random rotation to provide visual variety. */
                    z: 360.0
                },
                onDragBegan: function(x, y) {
                    console.log("onDragBegan::oneFingerGestureAllowed",oneFingerGestureAllowed);
                    oneFingerGestureAllowed = true;
                
                    return true;
                },
                onDragChanged: function(relativeX, relativeY, intersectionX, intersectionY) {
                    
                    if (oneFingerGestureAllowed) {
                        console.log("onDragChanged",relativeX, relativeY, intersectionX, intersectionY);
                        this.translate = {x:intersectionX, y:intersectionY};
                    }
                    return true;
                },
                onRotationBegan: function(angleInDegrees) {
                    console.log("onRotationBegan::oneFingerGestureAllowed",oneFingerGestureAllowed);
                    oneFingerGestureAllowed = false;
                    return true;
                },
                onRotationChanged: function(angleInDegrees) {
                    console.log("onRotationChanged",rotationValues[modelIndex] ,angleInDegrees);
                    this.rotate.z = rotationValues[modelIndex] - angleInDegrees;
                },
                onRotationEnded: function(angleInDegrees) {
                    console.log("onRotationEnded",rotationValues[modelIndex] ,angleInDegrees);
                   rotationValues[modelIndex] = this.rotate.z
                   oneFingerGestureAllowed = true;
                },

                onError: World.onError
            });

            allCurrentModels.push(model);
            rotationValues.push(model.rotate.z);
            flipValues.push(model.rotate.tilt);
            this.instantTrackable.drawables.addCamDrawable(model);
        }
    },

    resetModels: function resetModelsFn() {
        this.instantTrackable.drawables.removeCamDrawable(allCurrentModels);
        allCurrentModels = [];
    },

    onError: function onErrorFn(error) {
        alert(error);

        /* if license check failed, stop repeatedly calling `canStartTracking` */
        if (error.id === 1001 && error.domain === "InstantTracking") {
            clearInterval(World.canStartTrackingIntervalHandle);
        }
    },

    showUserInstructions: function showUserInstructionsFn(message) {
        var ele = document.getElementById('loadingMessage')
        ele.display = "block";
        ele.innerHTML = message;
    },

    hideUserInstructions: function hideUserInstructionsFn() {
        var ele = document.getElementById('loadingMessage');
        ele.display = "none";
        
    }
};
AR.context.on2FingerGestureStarted = function() {
    oneFingerGestureAllowed = true;
}
AR.hardware.smart.onPlatformAssistedTrackingAvailabilityChanged = function(availability) {
    switch (availability) {
        case AR.hardware.smart.SmartAvailability.INDETERMINATE_QUERY_FAILED:
            /* Query failed for some reason; try again or accept the fact. */
            World.showUserInstructions("Could not determine if platform assisted tracking is supported.<br>" +
                "Running without platform assisted tracking (ARKit or ARCore).");
            World.createOverlays();
            break;
        case AR.hardware.smart.SmartAvailability.CHECKING_QUERY_ONGOING:
            /* Query currently ongoing; be patient and do nothing or inform the user about the ongoing process. */
            break;
        case AR.hardware.smart.SmartAvailability.UNSUPPORTED:
            /* Not supported, create the scene now without platform assisted tracking enabled. */
            World.showUserInstructions("Running without platform assisted tracking (ARKit or ARCore).");
            World.createOverlays();
            break;
        case AR.hardware.smart.SmartAvailability.SUPPORTED_UPDATE_REQUIRED:
        case AR.hardware.smart.SmartAvailability.SUPPORTED:
            /*
                Supported, create the scene now with platform assisted tracking enabled SUPPORTED_UPDATE_REQUIRED
                may be followed by SUPPORTED, make sure not to create the scene twice (see check in createOverlays).
             */
            World.platformAssisstedTrackingSupported = true;
            World.showUserInstructions("Running with platform assisted tracking(ARKit or ARCore). <br> " +
                "Move your phone around until the crosshair turns green, which is when you can start tracking.");
            World.createOverlays();
            setTimeout(function() {
               World.hideUserInstructions();
            }, 10000);
            break;
    }
};

World.init();